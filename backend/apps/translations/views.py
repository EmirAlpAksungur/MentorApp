from django.shortcuts import render

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from concurrent.futures import ThreadPoolExecutor

from django.core.cache import cache

from .models import Translations
from .serializers import GetTranslationsSerializer

class GetTranslationsByIdView(generics.ListAPIView):
    permission_classes = [
        permissions.AllowAny,
    ]
    
    def post(self, request, *args, **kwargs):
        data = []
        
        def fetch_value(key):
            return cache.get(key)

        with ThreadPoolExecutor() as executor:
            language_id = request.data["LanguageId"]
            keys = [f"{language_id}_{key}" for key in request.data["TextContentIds"]]

            results = list(executor.map(fetch_value, keys))

        data = [value for value in results if value is not None]

        if len(data) != len(request.data["TextContentIds"]):
            print("ife Girid")
            queryset = Translations.objects.filter(
                LanguageId = request.data["LanguageId"],
                TextContentId__in=request.data["TextContentIds"]
            )
            serializer = GetTranslationsSerializer(queryset, many=True)
            data = serializer.data
            for i in data:
                cache.set(str(request.data["LanguageId"])+"_"+str(i['TextContentId']), i, timeout=None)
        return Response(data, status=status.HTTP_200_OK)