from django.shortcuts import render
from django.http import HttpResponse
import requests

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Automobile
from .serializers import AutomobileSerializer
 
class AutomobileData(APIView):
    def get(self, request, format=None):
        automobile = Automobile.objects.all()
        serializer = AutomobileSerializer(automobile, many=True)
        return Response(serializer.data)

# Create your views here.
def index(response):
    return render(response, "main/index.html")

def tracker(response):
    return render(response, "main/tracker.html")

def vehicle(response):
    vehicles = Automobile.objects.all()
    return render(response, "main/vehicle.html", {"vehicles": vehicles})

def whatcanido(response):
    return render(response, "main/whatcanido.html")

#def api(request):
 #  url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDk0KjJLF2X4ng7kEbBB7YxtZFbNy8kz-k&callback=initMap&libraries=&v=weekly"
 #  response = requests.get(url, headers={'Authorization':'Bearer %s' % 'access_token'}).json()

 #  return render(request, 'tracker.html', {'response':response})