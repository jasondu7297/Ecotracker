from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("tracker/", views.tracker, name="tracker"),
    path("vehicle/", views.vehicle, name="vehicle"),
    path("whatcanido/", views.whatcanido, name="whatcanido")
]
