# Generated by Django 3.0.3 on 2020-03-03 04:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stocksbackend', '0003_auto_20200303_0051'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='funds',
            field=models.DecimalField(decimal_places=2, default=32000, max_digits=9),
        ),
    ]
