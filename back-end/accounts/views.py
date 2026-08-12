from django.utils import timezone
from django.conf import settings
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from .serializers import LoginSerializer
from django.contrib.auth import authenticate

from core.validators import normalize_iran_phone
from .models import CustomUser, OTP
from .jwt import set_token_cookies
from .serializers import (
    SendOTPSerializer,
    VerifyOTPSerializer,
    ResendOTPSerializer,
    OTPMaskedPhoneResponseSerializer,
)

SEND_OTP_LIMIT_MINUTES = 10


class send_otp_view(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = SendOTPSerializer(data=request.data)
        if serializer.is_valid():
        
            phone_number = normalize_iran_phone(serializer.validated_data['phone_number'])
            
            third_last_otp = OTP.objects.filter(phone_number=phone_number).order_by('-created_at')[2:3].first()
            if third_last_otp:
                time_passed = timezone.now() - third_last_otp.created_at
                if time_passed <= timezone.timedelta(minutes=10):
                    print('too many requests')
                    return Response({'message': 'به حد مجاز درخواست کد رسیده اید'}, status=status.HTTP_429_TOO_MANY_REQUESTS)
                
            otp = OTP.objects.create(phone_number=phone_number)
            code = otp.code

            
            # SMS SERVICE 


            return Response({
                "message": "کد با موفقیت ارسال شد",
                "otp_uuid": otp.public_id,
                }, status=status.HTTP_200_OK)

        return Response(
            {
                'message': str(serializer.errors['phone_number'][0]),
            }, 
            status=status.HTTP_400_BAD_REQUEST)

class otp_status_view(APIView):
    permission_classes = [AllowAny]

    def get(self, request, otp_uuid):

        try:
            otp = OTP.objects.get(public_id=otp_uuid)
        except OTP.DoesNotExist:
            return Response({'message': 'کد وارد شده نامعتبر است'}, status=status.HTTP_400_BAD_REQUEST)
    
        
        response_serializer = OTPMaskedPhoneResponseSerializer({
            'message': 'اطلاعات با موفقیت ارسال شد',
            'otp_uuid': otp.public_id,
            'otp_expire_at': otp.expire_at,
            'masked_phone': otp.get_masked_phone()
            })
        return Response(response_serializer.data, status=status.HTTP_200_OK)
    
    # resend OTP 
    def post(self, request):
        serializer = ResendOTPSerializer(data=request.data)
        if serializer.is_valid():
            otp_uuid = serializer.validated_data['otp_uuid']

            try:
                phone_number = OTP.objects.filter(public_id=otp_uuid).first().phone_number
            except OTP.DoesNotExist:
                return Response({'message': 'کد مورد نظر یافت نشد'}, status=status.HTTP_404_NOT_FOUND)
            
            otp = OTP.objects.create(phone_number=phone_number)
            code = otp.code

            # SMS SERVICE

            return Response({
                'message': 'کد باموفقیت ارسال شد',
                'masked_phone': otp.get_masked_phone(),
                'otp_expire_at': otp.expire_at,
                'otp_uuid': otp.public_id,
                }, status=status.HTTP_200_OK)
        
        print('errors: ', serializer.errors)
        return Response({
            'message': serializer.errors,
            }, status=status.HTTP_400_BAD_REQUEST)

class verify_otp_view(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        if serializer.is_valid():
            otp_uuid = serializer.validated_data['otp_uuid']
            entered_code = serializer.validated_data['code']

            try:
                otp = OTP.objects.filter(public_id=otp_uuid).first()
            except OTP.DoesNotExist:
                return Response({'message': 'کدی با این اطلاعات یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

            if otp.is_valid == True:

                if otp.attempts >= otp.MAX_ATTEMPTS:

                    return Response(
                        {'message': 'تعداد دفعات کد بیش ازحد مجاز میباشد'}, 
                        status=status.HTTP_429_TOO_MANY_REQUESTS
                        )
                
                otp.attempts += 1
                otp.save()
                
                if not otp.code == entered_code:

                    return Response(
                        {'message': 'کد وارد شده صحیح نمیباشد'}, 
                        status=status.HTTP_406_NOT_ACCEPTABLE
                        )
                
                otp.is_used = True
                otp.save()
                
                try:
                    user = CustomUser.objects.get(phone_number=otp.phone_number)

                    refresh_token = RefreshToken.for_user(user=user)
                    response = Response(
                        {
                            'message': 'کد وارد شده صحیح میباشد(ورود)',
                            'access_token': str(refresh_token.access_token),
                            'user_uuid': user.public_id,
                            'user_type': user.user_type,
                        }, 
                        status=status.HTTP_202_ACCEPTED
                    )
                    set_token_cookies(response=response, refresh_token=refresh_token)
                
                    return response   
                             
                except CustomUser.DoesNotExist:
                    new_user = CustomUser.objects.create_user(phone_number=otp.phone_number)

                    refresh_token = RefreshToken.for_user(new_user)
                    response = Response(
                        {
                            'message': 'کد وارد شده صحیح میباشد(ثبت نام)',
                            'access_token': str(refresh_token.access_token),
                            'user_uuid': new_user.public_id,
                            'user_type': new_user.user_type,
                        }, 
                        status=status.HTTP_201_CREATED
                    )
                    set_token_cookies(response=response, refresh_token=refresh_token)

                    return response
            print('otp is not valid')
            return Response({'message': 'کد وارد شد معتبر نمیباشد'}, status=status.HTTP_401_UNAUTHORIZED)
        print('serializer is not valid')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class access_token_refresh(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):

        refresh_token = request.COOKIES.get(settings.AUTH_COOKIE_REFRESH)

        if refresh_token is None:
            return Response({'message': 'توکن یافت نشد'}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            refresh = RefreshToken(refresh_token)
        except TokenError:
            return Response({'message': 'توکن موجود نیست'}, status=status.HTTP_401_UNAUTHORIZED)
        
        access_token = str(refresh.access_token)

        response = Response(
            {
                'message': 'توکن باموفقیت بازیابی شد',
                'access_token': access_token,
            }, 
            status=status.HTTP_200_OK
        )
        
        set_token_cookies(response=response, refresh_token=refresh)
        return response


class login_view(APIView):
        permission_classes = [AllowAny]

        def post(self, request):
            serializer = LoginSerializer(data=request.data)
            if serializer.is_valid():
                phone_number = normalize_iran_phone(serializer.validated_data['phone_number'])
                password = serializer.validated_data['password']

                try:
                    user = CustomUser.objects.get(phone_number=phone_number)
                except CustomUser.DoesNotExist:
                    return Response(
                        {'message': 'شماره موبایل یا رمز عبور اشتباه است'},
                        status=status.HTTP_401_UNAUTHORIZED
                    )

                if not user.check_password(password):
                    return Response(
                        {'message': 'شماره موبایل یا رمز عبور اشتباه است'},
                        status=status.HTTP_401_UNAUTHORIZED
                    )

                if not user.is_active:
                    return Response(
                        {'message': 'حساب کاربری غیرفعال است'},
                        status=status.HTTP_403_FORBIDDEN
                    )

                refresh_token = RefreshToken.for_user(user=user)
                response = Response(
                    {
                        'message': 'ورود با موفقیت انجام شد',
                        'access_token': str(refresh_token.access_token),
                        'user_uuid': user.public_id,
                    },
                    status=status.HTTP_200_OK
                )
                set_token_cookies(response=response, refresh_token=refresh_token)
                return response

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)