from django.urls import path
from .views import CartView, CartItemAddView, CartItemRemoveView

urlpatterns = [
    path('', CartView.as_view(), name='cart-detail'),
    path('add/', CartItemAddView.as_view(), name='cart-add'),
    path('remove/<int:item_id>/', CartItemRemoveView.as_view(), name='cart-remove'),
]