from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from apps.translations.models import Translations
from .models import Skill,SkillType
from .serializers import GetSkillTypeSerializer,GetSkillSerializer
class SkillTypeListView(generics.ListAPIView):
    permission_classes = [
        permissions.AllowAny,
    ]

    def get_queryset(self):
        return SkillType.objects.all()
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = GetSkillTypeSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SkillListView(generics.ListAPIView):
    def post(self, request):
        queryset  = Skill.objects.filter(SkillTypeId=request.data.get('SkillTypeId'))
        serializer = GetSkillSerializer(queryset , many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SkillListAllView(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = GetSkillSerializer
    
    def post(self, request):
        language_id = request.data.get('LanguageId')
        skills = self.get_queryset()
        
        skills_data = []
        for skill in skills:
            translation = Translations.objects.filter(TextContentId=skill.TextContentId, LanguageId=language_id).first()
            skills_serializers = self.get_serializer(skill)
            skills_data.append({
                **skills_serializers.data,
                'name': translation.Translations if translation else None
            })

        return Response(skills_data, status=status.HTTP_200_OK)