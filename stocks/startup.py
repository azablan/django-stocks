import django


def seed():
    django.setup()
    from stocksbackend.models.portfolio import User
    User.objects.all().delete()

    user_1 = User(
        username='azab', 
        email='azablan@gmail.com',
    )
    user_1.set_password('promenade')
    user_1.save()
    user_1.portfolio.buy('FB', 4)
    user_1.portfolio.buy('GOOGL', 10)
    user_1.portfolio.buy('TSLA', 2)
    user_1.portfolio.sell('GOOGL', 2)
    user_1.portfolio.buy('FB', 3)
    user_1.portfolio.buy('AMZN', 6)
    user_1.portfolio.sell('AMZN', 3)

    # user_2 = User(
    #     username='rchen', 
    #     email='rchen@gmail.com',
    # )
    # user_2.set_password('pancake')
    # user_2.save()
    # user_2.portfolio.buy('ROKU', 7)
    # user_2.portfolio.buy('MSFT', 5)
    # user_2.portfolio.buy('NFLX', 2)
    # user_2.portfolio.buy('DDOG', 4)
    # user_2.portfolio.buy('FB', 1)
    # user_2.portfolio.buy('NVDA', 11)
    # user_2.portfolio.buy('AMD', 3)






