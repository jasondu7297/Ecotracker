# Generated by Django 3.2.4 on 2021-06-26 14:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Coupe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('combined', models.FloatField()),
                ('carbon_rating', models.FloatField()),
                ('smog_rating', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Crossover',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('combined', models.FloatField()),
                ('carbon_rating', models.FloatField()),
                ('smog_rating', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='HatchbackOrSedan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('combined', models.FloatField()),
                ('carbon_rating', models.FloatField()),
                ('smog_rating', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='MinivanOrSUV',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('combined', models.FloatField()),
                ('carbon_rating', models.FloatField()),
                ('smog_rating', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='PickupTruck',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('combined', models.FloatField()),
                ('carbon_rating', models.FloatField()),
                ('smog_rating', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='SportsCar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('combined', models.FloatField()),
                ('carbon_rating', models.FloatField()),
                ('smog_rating', models.FloatField()),
            ],
        ),
    ]
