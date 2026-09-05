from django.db import models
from django.conf import settings
from products.models import ProductVariant


class Cart(models.Model):
    """سبد خرید - می‌تونه مال کاربر لاگین‌کرده یا مهمان باشه"""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="carts",
        verbose_name="کاربر",
    )
    session_key = models.CharField(
        max_length=40, null=True, blank=True, verbose_name="شناسه‌ی مهمان"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاریخ بروزرسانی")

    class Meta:
        verbose_name = "سبد خرید"
        verbose_name_plural = "سبدهای خرید"

    def __str__(self):
        if self.user:
            return f"سبد {self.user.phone_number}"
        return f"سبد مهمان ({self.session_key})"

    @property
    def total_price(self):
        return sum(item.subtotal for item in self.items.all())

    @property
    def total_items(self):
        return sum(item.quantity for item in self.items.all())


class CartItem(models.Model):
    """هر ردیف داخل سبد - یک نوع محصول (رنگ/سایز خاص) با تعداد مشخص"""
    cart = models.ForeignKey(
        Cart, on_delete=models.CASCADE, related_name="items", verbose_name="سبد"
    )
    variant = models.ForeignKey(
        ProductVariant, on_delete=models.CASCADE, related_name="cart_items", verbose_name="نوع محصول"
    )
    quantity = models.PositiveIntegerField(default=1, verbose_name="تعداد")
    added_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ افزودن")

    class Meta:
        verbose_name = "آیتم سبد"
        verbose_name_plural = "آیتم‌های سبد"
        unique_together = ("cart", "variant")

    def __str__(self):
        return f"{self.variant} × {self.quantity}"

    @property
    def subtotal(self):
        return self.variant.product.final_price * self.quantity