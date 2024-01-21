from django.db.models import fields
from rest_framework import serializers
from .models import Translations
 
class GetTranslationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Translations
        fields = ["TextContentId","Translations"]