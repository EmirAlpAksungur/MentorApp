from django.db.models import fields
from rest_framework import serializers
from .models import Blog
 
class BlogGetSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    def get_user(self, obj):
        return {
            'name':f"{obj.user.first_name} {obj.user.last_name}",
            'id':obj.user.id
        }
    class Meta:
        model = Blog
        fields = "__all__"


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ('uuid','user', 'photo', 'blog','summary', 'title')

class BlogTopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ('uuid', 'likes','dislikes', 'title','views')

class BlogDeleteSerializer(serializers.Serializer):
    uuid = serializers.UUIDField() 