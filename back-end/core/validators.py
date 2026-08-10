import re
from django.core.exceptions import ValidationError
from .utils import to_english_digits

IRAN_PHONE_FORMAT = re.compile(r'^(?:\+98|0098|98|0)9\d{9}')

def validate_iran_phone(phone):
    phone = to_english_digits(phone)
    if not IRAN_PHONE_FORMAT.match(phone):
        raise ValidationError('شماره تلفن مجاز وارد کنید')

def normalize_iran_phone(phone:str) -> str|None:
    phone = to_english_digits(phone)
    if not IRAN_PHONE_FORMAT.match(phone):
        return None
    return '98' + re.sub(r'^(?:\+98|98|0098|0)', '', phone)

def validate_persian(value):
    if not re.fullmatch(r'[\u0600-\u06FF\s]+', value):
        raise ValidationError("Only Persian characters are allowed.")

def validate_english(value):
    if not re.fullmatch(r'[A-Za-z\s]+', value):
        raise ValidationError("Only English characters are allowed.")