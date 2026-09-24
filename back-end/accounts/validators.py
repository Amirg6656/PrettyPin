import re
from django.core.exceptions import ValidationError


def normalize_iran_phone(phone_number):

    phone_number = phone_number.strip().replace(' ', '').replace('-', '')


    if phone_number.startswith('+98'):
        phone_number = '0' + phone_number[3:]
    elif phone_number.startswith('0098'):
        phone_number = '0' + phone_number[4:]
    elif phone_number.startswith('98'):
        phone_number = '0' + phone_number[2:]

    if re.fullmatch(r'09\d{9}', phone_number):
        return phone_number
    return None


def validate_iran_phone(value):
    if not normalize_iran_phone(value):
        raise ValidationError('شماره موبایل معتبر نیست. فرمت درست: 09xxxxxxxxx')