from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User

from .models import Portfolio, Transaction, Stock


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ( 'username', )


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ( 'token', 'username', 'password' )


class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = ( 'ticker', 'company', 'type', 'price', 'amount', 'timestamp' )


class StockSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stock
        fields = ( 'ticker', 'company', 'amount', 'info' )


class PortfolioSerializer(serializers.ModelSerializer):
    
    stocks = StockSerializer(many=True, read_only=True)
    transactions = TransactionSerializer(many=True, read_only=True)

    class Meta:
        model = Portfolio
        fields = ( 'funds', 'stocks', 'transactions')
