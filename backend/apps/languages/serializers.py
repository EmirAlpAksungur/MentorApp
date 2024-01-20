from django.db.models import fields
from rest_framework import serializers
from .models import Languages
 
class GetLanguagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Languages
        fields = "__all__"