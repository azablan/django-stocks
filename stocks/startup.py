import django
django.setup()
from stocksbackend.models import User


def seed():
    User.objects.all().delete()

    user = User(
        username='azab', 
        email='azablan@gmail.com',
        password='catdog'
    )
    user.save()

    user.profile.buy('FB', 4)
    user.profile.buy('GOOGL', 10)
    user.profile.buy('TSLA', 2)
    user.profile.buy('FB', 3)
