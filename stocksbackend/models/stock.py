from django.db import models

from .portfolio import Portfolio
from .util import get_one_info_by_ticker


class Stock(models.Model):
    portfolio = models.ForeignKey(Portfolio, related_name='stocks', on_delete=models.CASCADE, default=None)
    ticker = models.CharField(max_length=5)
    company = models.CharField(max_length=30)
    amount = models.PositiveIntegerField()

    @property
    def info(self):
        return get_one_info_by_ticker(self.ticker)