from django.db.models import fields
from rest_framework import serializers
from .models import Country,City
from apps.textContent.serializers import GetTextContentSerializer

class GetCountriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ["CountryId"]

class GetCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ["CityId","name"]

class GetCountryNameSerializer(serializers.ModelSerializer):
    TextContentId = GetTextContentSerializer()
    class Meta:
        model = Country
        fields = ["TextContentId","CountryId"]

class GetCityDetailsSerializer(serializers.ModelSerializer):
    CountryId = GetCountryNameSerializer()
    class Meta:
        model = City
        fields = ["CountryId","CityId","name"]