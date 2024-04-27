from django.db.models import fields
from rest_framework import serializers
from .models import Skill,SkillType
 
class GetSkillTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillType
        fields = "__all__"

class GetSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"