from django.urls import path
from .views import (
    send_otp_view,
    otp_status_view,
    verify_otp_view,
    access_token_refresh,
    login_view, register_view,
)

urlpatterns = [
    path('send-otp/', send_otp_view.as_view(), name='send-otp'),
    path('otp-status/<uuid:otp_uuid>/', otp_status_view.as_view(), name='otp-status'),
    path('resend-otp/', otp_status_view.as_view(), name='resend-otp'),
    path('verify-otp/', verify_otp_view.as_view(), name='verify-otp'),
    path('token/refresh/', access_token_refresh.as_view(), name='token-refresh'),
    path('login/', login_view.as_view(), name='login'),
    path('register/', register_view.as_view(), name='register'),
]