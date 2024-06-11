from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from apps.translations.models import Translations
from .models import Skill,SkillType
from .serializers import GetSkillTypeSerializer,GetSkillSerializer
class SkillTypeListView(generics.ListAPIView):
    def post(self, request, *args, **kwargs):
        language_id = request.data.get('LanguageId')
        skillTypes = SkillType.objects.all()
        skill_data = []
        for skillType in skillTypes:
            translation = Translations.objects.filter(TextContentId=skillType.TextContentId, LanguageId=language_id).first()
            skillTypeSerializer = GetSkillTypeSerializer(skillType)
            skill_data.append({
                **skillTypeSerializer.data,
                'name': translation.Translations if translation else None
            })

        return Response(skill_data, status=status.HTTP_200_OK)

class SkillListView(generics.ListAPIView):
    def post(self, request):
        language_id = request.data.get('LanguageId')
        skills  = Skill.objects.filter(SkillTypeId=request.data.get('SkillTypeId'))
        skill_data = []
        for skill in skills:
            translation = Translations.objects.filter(TextContentId=skill.TextContentId, LanguageId=language_id).first()
            skillTypeSerializer = GetSkillSerializer(skill)
            skill_data.append({
                **skillTypeSerializer.data,
                'name': translation.Translations if translation else None
            })

        return Response(skill_data, status=status.HTTP_200_OK)

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

class GetSkillContentView(generics.ListAPIView):
    
    def post(self, request):
        language_id = request.data.get('LanguageId')
        SkillId = request.data.get('SkillId')
        queryset = Skill.objects.filter(SkillId=SkillId)
        translation = Translations.objects.filter(TextContentId=queryset.first().TextContentId, LanguageId=language_id).first()

        return Response(translation.Translations, status=status.HTTP_200_OK)