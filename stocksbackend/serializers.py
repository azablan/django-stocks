from rest_framework import serializers

from .models import Profile, Transaction, Stock


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ( 'ticker', 'company', 'type', 'price', 'amount', 'timestamp' )


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ( 'ticker', 'company', 'amount', 'info' )