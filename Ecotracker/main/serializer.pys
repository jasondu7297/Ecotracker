from rest_framework import serializers

from .models import Week, Child

class ScheduleSerializer(serializers.ModelSerializer):
    num_child = serializers.SerializerMethodField()
    class Meta:
        model = Week
        fields = (
            'child',
            'start_date',
            'end_date', 
            'registered',
            'num_child'
        )
        
    def get_num_child(self, Week):
        try:
            return Week.num_child
        except:
            return None
