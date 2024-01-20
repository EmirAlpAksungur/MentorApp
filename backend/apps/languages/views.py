from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import Languages
from .serializers import GetLanguagesSerializer
class LanguagesListView(generics.ListAPIView):
    permission_classes = [
        permissions.AllowAny,
    ]

    def get(self, request, *args, **kwargs):
        print("sad")
        queryset = Languages.objects.all()
        serializer = GetLanguagesSerializer(queryset, many=True)
        return Response( serializer.data, status=status.HTTP_200_OK)