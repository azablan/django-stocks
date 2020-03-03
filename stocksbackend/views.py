from rest_framework import generics

from .models import Transaction, Stock, get_many_info_by_ticker
from .serializers import TransactionSerializer, StockSerializer


class TransactionListCreate(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class StockListCreate(generics.ListCreateAPIView):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer