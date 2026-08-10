import random
import uuid
from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from core.validators import validate_iran_phone, normalize_iran_phone
from core.models import TimeStampModel
from .managers import CustomUserManager
# from iranian_cities import CityField(), ProvinceField()

class CustomUser(AbstractUser, TimeStampModel):
    date_joined = None

    username_validator = UnicodeUsernameValidator()
    username = models.CharField(
        ('username'),
        max_length=100,
        unique=True,
        help_text=(
            "Letters, digits and @/./+/-/_ only."
        ),
        validators=[username_validator],
        error_messages={
            'unique': ('This username is not Available'),
        },
        blank=True,
        null=True,
    )

    public_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, db_index=True)
    phone_number = models.CharField(max_length=15, unique=True)
    profile_picture = models.ImageField(upload_to='profile pictures/', blank=True, default='profile pictures/default.jpg')

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return f'{self.phone_number}'
    
    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        unique_together = ('phone_number', )

    def clean(self):
        if self.phone_number:
            normalized_phone = normalize_iran_phone(self.phone_number)
            if normalized_phone is None:
                raise ValidationError({'phone_number': 'Enter a Valid Iranian Phone Number'})
            self.phone_number = normalized_phone

    def save(self, *args, **kwargs):
        self.full_clean()

        if not self.username or self.username=='':
            self.username = normalize_iran_phone(self.phone_number)

        super().save(*args, **kwargs)

class Address(models.Model):

    public_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, db_index=True)
    title = models.CharField(max_length=255, null=True, blank=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='addresses')

    formatted_address = models.CharField(max_length=255, null=True, blank=True)
    # province = ProvinceField(null=True, blank=True)
    # city = CityField(null=True, blank=True)
    latitude = models.DecimalField(max_digits=10, decimal_places=7)
    longitude = models.DecimalField(max_digits=10, decimal_places=7)

    plaque = models.DecimalField(max_digits=6, decimal_places=0, null=True, blank=True)
    unit = models.PositiveIntegerField(null=True, blank=True)
    postal_code = models.DecimalField(max_digits=12, decimal_places=0, null=True, blank=True)

    is_default = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Addresses'

    def __str__(self):
        return f'{self.formatted_address}'


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