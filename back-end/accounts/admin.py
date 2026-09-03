from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from core.mixins import RowNumberMixin
from .models import CustomUser, Address, OTP


@admin.register(CustomUser)
class CustomUserAdmin(RowNumberMixin, admin.ModelAdmin):

    list_display = [
        'row_number',
        'username',
        'phone_number',
        'get_full_name',
        'email',
        'is_active',
        'is_staff',
        'is_superuser',
        'created_at'
    ]
    list_display_links = ['row_number', 'username',]
    list_filter = ['is_active', 'is_staff', 'is_superuser',]
    search_fields = ['username', 'first_name', 'last_name', 'phone_number',]
    readonly_fields = ['created_at']

    fieldsets = (
        (None, {'fields':('username', 'password')}),
        ('Personal Information', {'fields': ('first_name', 'last_name', 'phone_number', 'email')}),
        ('Permissions & Access', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Date & Time', {'fields': ('last_login', 'created_at', 'updated_at')}),
    )

@admin.register(Address)
class AddressAdmin(RowNumberMixin, admin.ModelAdmin):
    list_display = [
        'row_number',
        'title',
        'user',
        'formatted_address',
        'plaque', 'unit', 'postal_code',
        'is_default',
        'created_at',
    ]

    list_display_links = ['row_number', 'title',]
    list_filter = ['is_default']
    search_fields = ['title', 'user__phone_number', 'user__username', 'formatted_address', 'plaque', 'unit', 'postal_code',]
    readonly_fields = ['created_at', ]
    fieldsets = (
        (None, {'fields':('title', 'user')}),
        ('Address Detail', {'fields': ('formatted_address', 'plaque', 'unit', 'postal_code', 'is_default')}),
        ('Coordinates', {'fields': ('latitude', 'longitude')}),
        ('Date & Time', {'fields': ('created_at',)}),
    )


@admin.register(OTP)
class OTPAdmin(RowNumberMixin, admin.ModelAdmin):
    date_hierarchy = 'created_at'
    list_display = ('row_number', 'phone_number', 'code', 'attempts', 'is_valid', 'is_used', 'is_expired', 'is_locked', 'created_at', 'expire_at')
    search_fields = ('phone_number', 'code')
    list_filter = ('is_used', )
    readonly_fields = ('created_at', 'expire_at', 'code', 'attempts', 'is_valid', 'is_locked', 'is_expired', 'is_used')