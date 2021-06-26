from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(response):
    return render(response, "main/index.html")

def tracker(response):
    return render(response, "main/tracker.html")

def vehicle(response):
    return render(response, "main/vehicle.html")

def whatcanido(reponse):
    return render(reponse, "main/whatcanido.html")


