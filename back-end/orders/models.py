from django.db import models
from django.conf import settings
from accounts.models import Address
from products.models import ProductVariant


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'در انتظار پرداخت'),
        ('paid', 'پرداخت شده'),
        ('shipped', 'ارسال شده'),
        ('delivered', 'تحویل داده شده'),
        ('cancelled', 'لغو شده'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="orders",
        verbose_name="کاربر",
    )
    address = models.ForeignKey(
        Address,
        on_delete=models.PROTECT,
        related_name="orders",
        verbose_name="آدرس ارسال",
    )
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name="وضعیت"
    )
    total_price = models.PositiveIntegerField(verbose_name="مبلغ کل (تومان)")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ثبت")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاریخ بروزرسانی")

    class Meta:
        verbose_name = "سفارش"
        verbose_name_plural = "سفارش‌ها"
        ordering = ["-created_at"]

    def __str__(self):
        return f"سفارش #{self.id} - {self.user.phone_number}"


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name="items", verbose_name="سفارش"
    )
    variant = models.ForeignKey(
        ProductVariant, on_delete=models.PROTECT, related_name="order_items", verbose_name="نوع محصول"
    )
    quantity = models.PositiveIntegerField(verbose_name="تعداد")
    price_at_order = models.PositiveIntegerField(verbose_name="قیمت لحظه‌ی خرید (تومان)")

    class Meta:
        verbose_name = "آیتم سفارش"
        verbose_name_plural = "آیتم‌های سفارش"

    def __str__(self):
        return f"{self.variant} × {self.quantity}"

    @property
    def subtotal(self):
        return self.price_at_order * self.quantity