from django.db import models
from Languages.models import Languages
from TextContent.models import TextContent

# Create your models here.

class Translations(models.Model):
    TranslationsId = models.CharField(primary_key = True)
    TextContentId = models.ForeignKey(TextContent, on_delete=models.CASCADE)
    LanguageId = models.ForeignKey(Languages, on_delete=models.CASCADE)
    Translations = models.CharField(max_length = 200)
