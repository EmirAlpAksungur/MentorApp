from django.db import models
from apps.languages.models import Languages
from apps.textContent.models import TextContent

# Create your models here.

class Translations(models.Model):
    TranslationsId = models.IntegerField(primary_key = True)
    TextContentId = models.ForeignKey(TextContent, on_delete=models.CASCADE)
    LanguageId = models.ForeignKey(Languages, on_delete=models.CASCADE)
    Translations = models.CharField(max_length = 500)
