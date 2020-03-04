from django.urls import path
from . import views

urlpatterns = [
    path('portfolio/', views.PortfolioRetrieve.as_view()),
    path('transactions/', views.TransactionListCreate.as_view()),
    path('stocks/', views.StockListCreate.as_view()),
    path('users/', views.UserList.as_view()),
    path('current_user/', views.current_user)
]