from django.db import models


class Category(models.Model):
    """دسته‌بندی محصولات (قابلیت تعریف زیر‌دسته‌بندی)"""
    name = models.CharField(max_length=100, verbose_name="نام دسته‌بندی")
    slug = models.SlugField(
        max_length=100, unique=True, allow_unicode=True, verbose_name="اسلاگ"
    )
    parent = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="children",
        verbose_name="دسته‌بندی مادر",
    )
    image = models.ImageField(
        upload_to="categories/",
        blank=True,
        null=True,
        verbose_name="تصویر دسته‌بندی",
    )

    class Meta:
        verbose_name = "دسته‌بندی"
        verbose_name_plural = "دسته‌بندی‌ها"

    def __str__(self):
        if self.parent:
            return f"{self.parent.name} > {self.name}"
        return self.name


class Product(models.Model):
    """مدل اصلی محصول"""
    title = models.CharField(max_length=200, verbose_name="عنوان محصول")
    slug = models.SlugField(
        max_length=200, unique=True, allow_unicode=True, verbose_name="اسلاگ"
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="products",
        verbose_name="دسته‌بندی",
    )
    description = models.TextField(verbose_name="توضیحات کامل")
    price = models.PositiveIntegerField(verbose_name="قیمت (تومان)")
    discount_price = models.PositiveIntegerField(
        null=True, blank=True, verbose_name="قیمت با تخفیف (تومان)"
    )
    is_active = models.BooleanField(
        default=True, verbose_name="فعال / آماده فروش"
    )
    specifications = models.JSONField(
        default=dict,
        blank=True,
        verbose_name="مشخصات فنی",
        help_text="ویژگی‌ها را به صورت کلید و مقدار وارد کنید.",
    )
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name="تاریخ ایجاد"
    )
    updated_at = models.DateTimeField(
        auto_now=True, verbose_name="تاریخ بروزرسانی"
    )

    class Meta:
        verbose_name = "محصول"
        verbose_name_plural = "محصولات"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

    @property
    def final_price(self):
        """قیمت نهایی با احتساب تخفیف"""
        if self.discount_price and self.discount_price < self.price:
            return self.discount_price
        return self.price

    @property
    def is_available(self):
        """آیا حداقل یک نوع از این محصول موجوده؟"""
        return self.is_active and self.variants.filter(stock__gt=0).exists()


class ProductVariant(models.Model):
    """نوع محصول بر اساس رنگ و سایز (موجودی جدا برای هر ترکیب)"""
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="variants",
        verbose_name="محصول",
    )
    color = models.CharField(max_length=50, verbose_name="رنگ")
    size = models.CharField(
        max_length=50, blank=True, null=True, verbose_name="سایز"
    )
    stock = models.PositiveIntegerField(default=0, verbose_name="موجودی این نوع")

    class Meta:
        verbose_name = "نوع محصول"
        verbose_name_plural = "انواع محصول"
        unique_together = ("product", "color", "size")

    def __str__(self):
        if self.size:
            return f"{self.product.title} - {self.color} - {self.size}"
        return f"{self.product.title} - {self.color}"

    @property
    def is_available(self):
        return self.product.is_active and self.stock > 0


class ProductImage(models.Model):
    """گالری تصاویر برای هر محصول"""
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="images",
        verbose_name="محصول",
    )
    image = models.ImageField(upload_to="products/", verbose_name="تصویر")
    is_main = models.BooleanField(default=False, verbose_name="تصویر اصلی؟")

    class Meta:
        verbose_name = "تصویر محصول"
        verbose_name_plural = "گالری تصاویر"

    def __str__(self):
        return f"{self.product.title} - {'اصلی' if self.is_main else 'گالری'}"