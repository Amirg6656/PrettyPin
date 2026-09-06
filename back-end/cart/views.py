from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Cart, CartItem
from .serializers import CartSerializer


def get_or_create_cart(request):
    """پیدا کردن سبد کاربر لاگین‌کرده یا مهمان، یا ساختن سبد جدید"""
    if request.user and request.user.is_authenticated:
        cart, _ = Cart.objects.get_or_create(user=request.user)
        return cart

    if not request.session.session_key:
        request.session.create()
    session_key = request.session.session_key

    cart, _ = Cart.objects.get_or_create(session_key=session_key, user=None)
    return cart


class CartView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        cart = get_or_create_cart(request)
        serializer = CartSerializer(cart)
        return Response(serializer.data)


class CartItemAddView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        cart = get_or_create_cart(request)
        variant_id = request.data.get('variant_id')
        quantity = int(request.data.get('quantity', 1))

        if not variant_id:
            return Response({'message': 'variant_id الزامی است'}, status=status.HTTP_400_BAD_REQUEST)

        item, created = CartItem.objects.get_or_create(
            cart=cart, variant_id=variant_id,
            defaults={'quantity': quantity}
        )
        if not created:
            item.quantity += quantity
            item.save()

        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CartItemRemoveView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, item_id):
        cart = get_or_create_cart(request)
        try:
            item = CartItem.objects.get(id=item_id, cart=cart)
            item.delete()
        except CartItem.DoesNotExist:
            return Response({'message': 'آیتم یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)