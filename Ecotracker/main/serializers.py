from rest_framework import serializers

from .models import Automobile

class AutomobileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Automobile
        fields = (
            'vehicle_type',
            'emission',
        )