from django.db import models
from .portfolio import Portfolio


class Transaction(models.Model):
    BUY = 'BUY'
    SELL = 'SELL'
    TRANSACTION_CHOICES = [
        (BUY, 'buy'),
        (SELL, 'sell'),
    ]

    portfolio = models.ForeignKey(Portfolio, related_name='transactions', on_delete=models.CASCADE, default=None)
    ticker = models.CharField(max_length=5)
    company = models.CharField(max_length=30)
    type = models.CharField(max_length=4, choices=TRANSACTION_CHOICES) 
    price = models.DecimalField(max_digits=9, decimal_places=2)
    amount = models.PositiveIntegerField()
    timestamp = models.DateTimeField(auto_now_add=True, blank=True)