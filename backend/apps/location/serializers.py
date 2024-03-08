from django.db.models import fields
from rest_framework import serializers
from .models import Country,City
 
class GetCountriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ["CountryId"]

class GetCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ["CityId","name"]