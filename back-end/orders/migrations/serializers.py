from rest_framework import serializers
from .models import Order, OrderItem
from products.serializers import ProductVariantSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    variant = ProductVariantSerializer(read_only=True)
    subtotal = serializers.ReadOnlyField()

    class Meta:
        model = OrderItem
        fields = ['id', 'variant', 'quantity', 'price_at_order', 'subtotal']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'status', 'total_price', 'address', 'items', 'created_at']