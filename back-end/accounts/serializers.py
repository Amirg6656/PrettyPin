from rest_framework import serializers

from accounts.validators import normalize_iran_phone
from core.validators import validate_iran_phone


class SendOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15, validators=[validate_iran_phone])
    

class OtpIdSerializer(serializers.Serializer):
    otp_id = serializers.UUIDField()

class OTPMaskedPhoneResponseSerializer(serializers.Serializer):
    otp_id = serializers.UUIDField()
    otp_expire_at = serializers.DateTimeField()
    masked_phone = serializers.CharField(max_length=12)

class VerifyOTPSerializer(serializers.Serializer):
    otp_id = serializers.UUIDField()
    code = serializers.CharField(max_length=6)


class LoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15, validators=[validate_iran_phone])
    password = serializers.CharField(max_length=128, write_only=True)


class RegisterSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=150)
    phone_number = serializers.CharField(max_length=15, validators=[validate_iran_phone])
    password = serializers.CharField(max_length=128, min_length=8, write_only=True)

    def validate_phone_number(self, value):
        from .models import CustomUser
        normalized = normalize_iran_phone(value)
        if CustomUser.objects.filter(phone_number=normalized).exists():
            raise serializers.ValidationError("این شماره موبایل قبلاً ثبت‌نام کرده است")
        return value