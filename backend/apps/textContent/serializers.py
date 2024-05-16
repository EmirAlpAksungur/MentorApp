from rest_framework import serializers
from .models import TextContent
from apps.blog.serializers import BlogTopSerializer


class GetTextContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextContent
        fields = "__all__"