from django.db import models


class Automobile(models.Model):
    vehicle_type = models.CharField(max_length=255)
    combined = models.FloatField()
    emission = models.FloatField(default=0)
    carbon_rating = models.FloatField()
    smog_rating = models.FloatField()
