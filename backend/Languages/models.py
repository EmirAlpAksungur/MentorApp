from django.db import models

# Create your models here.

class Languages(models.Model):
    LanguageId = models.CharField(primary_key = True)
    LanguageCode = models.CharField(max_length = 5)
    LanguageName = models.CharField(max_length = 100)