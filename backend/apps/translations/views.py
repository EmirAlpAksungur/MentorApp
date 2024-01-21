from django.shortcuts import render

from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import Translations
from .serializers import GetTranslationsSerializer

class GetTranslationsByIdView(generics.ListAPIView):
    permission_classes = [
        permissions.AllowAny,
    ]
    
    def post(self, request, *args, **kwargs):
        queryset = Translations.objects.filter(
            LanguageId=request.data["LanguageId"],
            TextContentId__in=request.data["TextContentIds"]
        )
        serializer = GetTranslationsSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)