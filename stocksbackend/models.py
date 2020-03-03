from django.db import models
from django.db.models.signals import post_save
from django.utils import timezone
from django.dispatch import receiver
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    funds = models.DecimalField(max_digits=9, decimal_places=2, default=32000)

    def buy(self, ticker, amount):
        ticker = ticker.upper()

        self.__complete_buy_order(
            ticker=ticker,
            company='todo',
            price=3.50,
            amount=amount
        )
    

    def __complete_buy_order(self, ticker, company, price, amount):
        self.__make_buy_transaction(ticker=ticker, company=company, price=price, amount=amount)
        self.__raise_stock(ticker=ticker, company=company, amount=amount)
        self.save()


    def __make_buy_transaction(self, ticker, company, price, amount):
        cost = price * amount
        if self.funds < cost:
            raise Exception('not enough funds to make transaction')
        self.funds -= cost
        self.transaction_set.create(
            type='BUY',
            ticker=ticker,
            company=company,
            price=price,
            amount=amount
        )


    def __raise_stock(self, ticker, company, amount):
        match = self.stock_set.filter(ticker=ticker)
        if match:
            existing_stock = match[0]
            existing_stock.amount += amount
            existing_stock.save()
        else:
            self.stock_set.create(ticker=ticker, company=company, amount=amount)


class Transaction(models.Model):
    BUY = 'BUY'
    SELL = 'SELL'
    TRANSACTION_CHOICES = [
        (BUY, 'buy'),
        (SELL, 'sell'),
    ]

    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, default=None)
    ticker = models.CharField(max_length=5)
    company = models.CharField(max_length=30)
    type = models.CharField(max_length=4, choices=TRANSACTION_CHOICES) 
    price = models.DecimalField(max_digits=9, decimal_places=2)
    amount = models.PositiveIntegerField()
    timestamp = models.DateTimeField(auto_now_add=True, blank=True)


class Stock(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, default=None)
    ticker = models.CharField(max_length=5)
    company = models.CharField(max_length=30)
    amount = models.PositiveIntegerField()

    
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
