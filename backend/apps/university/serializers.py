from django.db.models import fields
from rest_framework import serializers
from .models import University
from apps.location.serializers import GetCitySerializer
class GetUniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ["UniversityId","name"]

class UniversityDetailSerializer(serializers.ModelSerializer):
    CityId = GetCitySerializer() 
    class Meta:
        model = University
        fields = ['UniversityId', 'CityId', 'name']  