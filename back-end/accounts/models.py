import random
import uuid
from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.contrib.auth.models import AbstractUser
from .validators import validate_iran_phone, normalize_iran_phone


class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=15, unique=True)
    address = models.CharField(max_length=255, blank=True, null=True)


class OTP(models.Model):

    def generate_code():
        return str(random.randint(100000, 999999))

    MAX_ATTEMPTS = 5

    public_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, db_index=True)
    phone_number = models.CharField(max_length=15, validators=[validate_iran_phone])
    code = models.CharField(max_length=6, default=generate_code)
    created_at = models.DateTimeField(auto_now_add=True)
    attempts = models.PositiveIntegerField(default=0)
    expire_at = models.DateTimeField()
    is_used = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'OTP'
        verbose_name_plural = 'OTPs'

    @property
    def is_expired(self):
        return self.expire_at is None or self.expire_at <= timezone.now()

    @property
    def is_locked(self):
        return self.attempts >= self.MAX_ATTEMPTS

    @property
    def is_valid(self):
        return not self.is_used and not self.is_expired and not self.is_locked

    def get_masked_phone(self):
        return self.phone_number[:5] + '****' + self.phone_number[-3:]

    def clean(self):
        if self.phone_number:
            normalized_phone = normalize_iran_phone(self.phone_number)
            if not normalized_phone:
                raise ValidationError({'phone_number': 'Enter a Valid Iranian Phone Number'})
            self.phone_number = normalized_phone

    def save(self, *args, **kwargs):
        if not self.expire_at:
            self.expire_at = timezone.now() + timezone.timedelta(minutes=2)
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"OTP for {self.phone_number} = {self.code}"