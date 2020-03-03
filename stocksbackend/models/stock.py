from django.db import models

from .profile import Profile
from .util import get_one_info_by_ticker


class Stock(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, default=None)
    ticker = models.CharField(max_length=5)
    company = models.CharField(max_length=30)
    amount = models.PositiveIntegerField()

    @property
    def info(self):
        return get_one_info_by_ticker(self.ticker)