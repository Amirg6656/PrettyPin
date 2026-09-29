from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from cart.models import Cart
from accounts.models import Address
from .models import Order, OrderItem
from .serializers import OrderSerializer


class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        address_id = request.data.get('address_id')

        try:
            address = Address.objects.get(id=address_id, user=request.user)
        except Address.DoesNotExist:
            return Response({'message': 'آدرس معتبر نیست'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            cart = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            return Response({'message': 'سبد خرید خالی است'}, status=status.HTTP_400_BAD_REQUEST)

        if not cart.items.exists():
            return Response({'message': 'سبد خرید خالی است'}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(
            user=request.user,
            address=address,
            total_price=cart.total_price,
        )

        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                variant=cart_item.variant,
                quantity=cart_item.quantity,
                price_at_order=cart_item.variant.product.final_price,
            )

        cart.items.all().delete()

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class OrderListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)