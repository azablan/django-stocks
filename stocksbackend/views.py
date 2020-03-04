from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from json import loads as json_loads

from .models import Transaction, Stock
from .models.util import get_one_info_by_ticker
from .serializers import PortfolioSerializer, TransactionSerializer, StockSerializer, UserSerializer, UserSerializerWithToken


@api_view([ 'GET' ])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view([ 'GET' ])
def stock_info(request, ticker):
    info = get_one_info_by_ticker(ticker)
    return Response(info)


class UserList(APIView):

    permission_classes = ( permissions.AllowAny, )

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PortfolioRetrieve(generics.RetrieveAPIView):

    serializer_class = PortfolioSerializer

    def get_object(self):
        return self.request.user.portfolio


class TransactionListCreate(generics.ListCreateAPIView):

    serializer_class = TransactionSerializer

    def get_queryset(self):
        portfolio = self.request.user.portfolio
        return Transaction.objects.filter(portfolio=portfolio)

    def post(self, request):
        order = json_loads(self.request.body)
        if order['type'] == 'buy':
            request.user.portfolio.buy(order['ticker'], order['amount'])
        elif order['type'] == 'sell':
            request.user.portfolio.sell(order['ticker'], order['amount'])
        return Response({ 'success': True, 'message': f"{order['type']} transaction was successful" }, status=status.HTTP_201_CREATED)


class StockList(generics.ListAPIView):

    serializer_class = StockSerializer

    def get_queryset(self):
        portfolio = self.request.user.portfolio
        return Stock.objects.filter(portfolio=portfolio)