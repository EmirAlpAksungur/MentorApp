from django.db import models
from apps.languages.models import Languages
# Create your models here.

class TextContent(models.Model):
    TextContentId = models.IntegerField(primary_key = True)
    OriginalText = models.CharField(max_length = 400)
    LanguageId = models.ForeignKey(Languages, on_delete=models.CASCADE)