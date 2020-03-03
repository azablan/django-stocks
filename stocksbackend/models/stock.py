from django.db import models

from .profile import Profile


class Stock(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, default=None)
    ticker = models.CharField(max_length=5)
    company = models.CharField(max_length=30)
    amount = models.PositiveIntegerField()