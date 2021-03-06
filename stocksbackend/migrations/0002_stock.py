# Generated by Django 3.0.3 on 2020-03-02 21:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stocksbackend', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ticker', models.CharField(max_length=5)),
                ('company', models.CharField(max_length=30)),
                ('amount', models.PositiveIntegerField()),
            ],
        ),
    ]
