from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User

from .util import get_one_info_by_ticker


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    funds = models.DecimalField(max_digits=9, decimal_places=2, default=32000)

    def buy(self, ticker, amount):
        ticker = ticker.upper()
        stock_quote = get_one_info_by_ticker(ticker)['quote']
        company = stock_quote['companyName']
        price = stock_quote['latestPrice']
        self.__complete_buy_order(ticker=ticker, company=company, price=price, amount=amount)

    def sell(self, ticker, amount):
        ticker = ticker.upper()
        stock_quote = get_one_info_by_ticker(ticker)['quote']
        company = stock_quote['companyName']
        price = stock_quote['latestPrice']
        self.__complete_sell_order(ticker=ticker, company=company, price=price, amount=amount)
    
    def __complete_buy_order(self, ticker, company, price, amount):
        self.__make_buy_transaction(ticker=ticker, company=company, price=price, amount=amount)
        self.__raise_stock(ticker=ticker, company=company, amount=amount)
        self.save()

    def __make_buy_transaction(self, ticker, company, price, amount):
        cost = price * amount
        if self.funds < cost:
            raise Exception('not enough funds to make buy transaction')
        self.funds -= cost
        self.transaction_set.create(type='BUY', ticker=ticker, company=company, price=price, amount=amount)

    def __raise_stock(self, ticker, company, amount):
        match = self.stock_set.filter(ticker=ticker)
        if match:
            existing_stock = match[0]
            existing_stock.amount += amount
            existing_stock.save()
        else:
            self.stock_set.create(ticker=ticker, company=company, amount=amount)

    def __complete_sell_order(self, ticker, company, price, amount):
        self.__lower_stock(ticker=ticker, company=company, amount=amount)
        self.__make_sell_transaction(ticker=ticker, company=company, price=price, amount=amount)
        self.save()

    def __make_sell_transaction(self, ticker, company, price, amount):
        cost = price * amount
        self.funds += cost
        self.transaction_set.create(type='SELL', ticker=ticker, company=company, price=price, amount=amount)

    def __lower_stock(self, ticker, company, amount):
        match = self.stock_set.filter(ticker=ticker)
        if match and match[0].amount >= amount:
            existing_stock = match[0]
            existing_stock.amount -= amount
            existing_stock.save()
            if existing_stock.amount == 0:
                existing_stock.delete()
        else:
            raise Exception('not enough stock to make sell transaction')


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
