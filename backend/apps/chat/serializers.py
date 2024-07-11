from django.db.models import fields
from rest_framework import serializers
from .models import Chat, Message
from django.contrib.auth.models import User
from apps.profile.models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["photo"]
class UserSerializer(serializers.ModelSerializer):
    profil = ProfileSerializer()

    class Meta:
        model = User
        fields = ['first_name',"last_name","email","id","profil"]



class GetMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"

class GetChatSerializer(serializers.ModelSerializer):
    last_message = GetMessageSerializer()
    participants = UserSerializer(many=True)
    class Meta:
        model = Chat
        fields = ["last_message","id","participants"]

        
