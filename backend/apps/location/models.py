from django.db import models

from django.contrib.auth.models import User
from apps.textContent.models import TextContent

class Country(models.Model):
    CountryId = models.IntegerField(primary_key = True)
    TextContentId = models.OneToOneField(TextContent , on_delete=models.CASCADE)
    iso3 = models.CharField(max_length=3)
    iso2 = models.CharField(max_length=5)
    numeric_code = models.CharField(max_length=3)
    phone_code = models.CharField(max_length=20)
    capital = models.CharField(max_length=50)
    currency = models.CharField(max_length=5)
    currency_name = models.CharField(max_length=50)
    currency_symbol = models.CharField(max_length=20)
    tld = models.CharField(max_length=5)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    emoji = models.CharField(max_length=50)
    emojiU = models.CharField(max_length=50)

class City(models.Model):
    CityId = models.IntegerField(primary_key = True)
    name = models.CharField(max_length=100)
    state_code =  models.CharField(max_length=5)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    CountryId =  models.ForeignKey(Country, on_delete=models.CASCADE)
