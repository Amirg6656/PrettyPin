from rest_framework import serializers
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