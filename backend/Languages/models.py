from django.db import models

# Create your models here.

class Languages(models.Model):
    LanguageId = models.CharField(primary_key = True)
    LanguageName = models.CharField(max_length = 100)