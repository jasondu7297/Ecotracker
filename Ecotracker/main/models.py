from django.db import models

class HatchbackOrSedan(models.Model):
    name = models.CharField(max_length=255)
    combined = models.FloatField()
    carbon_rating = models.FloatField()
    smog_rating = models.FloatField()


class Coupe(models.Model):
    name = models.CharField(max_length=255)
    combined = models.FloatField()
    carbon_rating = models.FloatField()
    smog_rating = models.FloatField()


class SportsCar(models.Model):
    name = models.CharField(max_length=255)
    combined = models.FloatField()
    carbon_rating = models.FloatField()
    smog_rating = models.FloatField()


class MinivanOrSUV(models.Model):
    name = models.CharField(max_length=255)
    combined = models.FloatField()
    carbon_rating = models.FloatField()
    smog_rating = models.FloatField()


class PickupTruck(models.Model):
    name = models.CharField(max_length=255)
    combined = models.FloatField()
    carbon_rating = models.FloatField()
    smog_rating = models.FloatField()

class Crossover(models.Model):
    name = models.CharField(max_length=255)
    combined = models.FloatField()
    carbon_rating = models.FloatField()
    smog_rating = models.FloatField()





