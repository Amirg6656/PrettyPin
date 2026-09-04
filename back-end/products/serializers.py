from rest_framework import serializers
from .models import Category, Product, ProductVariant, ProductImage


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'parent', 'image']


class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['id', 'color', 'size', 'stock']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'is_main']


class ProductListSerializer(serializers.ModelSerializer):
    """برای صفحه‌ی لیست محصولات - اطلاعات خلاصه"""
    category = CategorySerializer(read_only=True)
    main_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'title', 'slug', 'category', 'price', 'discount_price', 'final_price', 'is_available', 'main_image']

    def get_main_image(self, obj):
        main = obj.images.filter(is_main=True).first()
        if main:
            return main.image.url
        first = obj.images.first()
        return first.image.url if first else None


class ProductDetailSerializer(serializers.ModelSerializer):
    """برای صفحه‌ی جزئیات یک محصول - اطلاعات کامل"""
    category = CategorySerializer(read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'slug', 'category', 'description',
            'price', 'discount_price', 'final_price', 'is_active',
            'is_available', 'specifications', 'variants', 'images',
        ]