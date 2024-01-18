from django.db import models
from Languages.models import Languages
# Create your models here.

class TextContent(models.Model):
    TextContentId = models.IntegerField(primary_key = True)
    OriginalText = models.CharField(max_length = 200)
    LanguageId = models.ForeignKey(Languages, on_delete=models.CASCADE)