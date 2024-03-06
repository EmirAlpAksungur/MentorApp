from django.db import models

from apps.location.models import City

class University(models.Model):
   UniversityId = models.IntegerField(primary_key = True)
   CityId = models.ForeignKey(City , on_delete=models.CASCADE)
   name = models.CharField(max_length = 300)

