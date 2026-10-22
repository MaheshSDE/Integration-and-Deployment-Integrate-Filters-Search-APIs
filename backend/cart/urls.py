from django.urls import path
from .views import CartView, AddToCartView, CartItemDetailView
 
urlpatterns = [
    path('', CartView.as_view()),              # GET
    path('add/', AddToCartView.as_view()),       # POST
    path('items/<int:pk>/', CartItemDetailView.as_view()), # PATCH/DELETE
]
