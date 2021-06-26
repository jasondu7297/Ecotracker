from django.db import models


class Automobile(models.Model):
    vehicle_type = models.CharField(max_length=255)
    combined = models.FloatField()
    emission = models.FloatField(default=0)
    carbon_rating = models.FloatField()
    smog_rating = models.FloatField()
    thumbnail = models.CharField(default="https://www.solidbackgrounds.com/images/950x350/950x350-vermilion-cinnabar-solid-color-background.jpg", max_length=255)
