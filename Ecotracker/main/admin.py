from django.contrib import admin

from .models import Automobile

class AutomobileAdmin(admin.ModelAdmin):
    list_display = ('vehicle_type', 'combined', 'emission', 'carbon_rating', 'smog_rating',)



admin.site.register(Automobile, AutomobileAdmin)
