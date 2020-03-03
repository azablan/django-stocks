from django.urls import path
from . import views

urlpatterns = [
    path('api/transactions/', views.TransactionListCreate.as_view()),
    path('api/stocks/', views.StockListCreate.as_view()),
]