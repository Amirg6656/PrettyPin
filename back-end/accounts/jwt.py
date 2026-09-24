from django.conf import settings
from rest_framework.response import Response

def set_token_cookies(response: Response, refresh_token: str | None = None) -> None :

    if refresh_token:
        response.set_cookie(
            key=settings.AUTH_COOKIE_REFRESH,
            value=refresh_token,
            max_age=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            path=settings.AUTH_COOKIE_REFRESH_PATH,
            httponly=settings.AUTH_COOKIE_HTTP_ONLY,
            domain=settings.AUTH_COOKIE_DOMAIN,
            secure=settings.AUTH_COOKIE_SECURE,
            samesite=settings.AUTH_COOKIE_SAMESITE,
        )
