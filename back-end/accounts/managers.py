from django.contrib.auth.models import BaseUserManager
from core.validators import normalize_iran_phone

class CustomUserManager(BaseUserManager):
    def create_user(self, phone_number, password=None, **extra_fields):
        """
        add new user based on phone number
        """
        if not phone_number:
            raise ValueError('phone number is required')
        
        if 'username' not in extra_fields or not extra_fields['username']:
            extra_fields['username'] = normalize_iran_phone(phone_number)
        
        user = self.model(phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, phone_number, password=None, **extra_fields):
        """
        create superuser based on phone number 
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        if 'username' not in extra_fields or not extra_fields['username']:
            extra_fields['username'] = normalize_iran_phone(phone_number)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        
        return self.create_user(phone_number, password, **extra_fields)