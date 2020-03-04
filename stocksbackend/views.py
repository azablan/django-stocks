from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User

from .models import Transaction, Stock
from .serializers import PortfolioSerializer, TransactionSerializer, StockSerializer, UserSerializer, UserSerializerWithToken


@api_view([ 'GET' ])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):

    permission_classes = ( permissions.AllowAny )

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


class StockListCreate(generics.ListCreateAPIView):

    serializer_class = StockSerializer

    def get_queryset(self):
        portfolio = self.request.user.portfolio
        return Stock.objects.filter(portfolio=portfolio)