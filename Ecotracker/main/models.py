from django.db import models

class HatchbackOrSedan(models.Model):
    combined = models.FloatField()
    emission = models.FloatField()
    carbon_rating = models.FloatField()
    smog_rating = models.FloatField()


class Coupe(models.Model):
    combined = models.FloatField()
    emission = models.FloatField() 
    carbon_rating = models.FloatField()
    smog_rating = models.FloatField()


class SportsCar(models.Model):
    combined = models.FloatField()
    emission = models.FloatField()
    carbon_rating = models.FloatField()
    smog_rating = models.FloatField()


class MinivanOrSUV(models.Model):
    combined = models.FloatField()
    emission = models.FloatField()
    carbon_rating = models.FloatField()
    smog_rating = models.FloatField()


class PickupTruck(models.Model):
    combined = models.FloatField()
    emission = models.FloatField()

    carbon_rating = models.FloatField()
    smog_rating = models.FloatField()

class Crossover(models.Model):
    combined = models.FloatField()
    emission = models.FloatField()
    carbon_rating = models.FloatField()
    smog_rating = models.FloatField()





