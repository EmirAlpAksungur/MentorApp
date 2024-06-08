from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.contrib.auth.backends import ModelBackend
from rest_framework.authtoken.models import Token
from .models import Profile, UnKnownSkills
from apps.blog.serializers import BlogTopSerializer
from rest_framework.serializers import Serializer, CharField, ValidationError
class CustomRegisterSerializer(RegisterSerializer, serializers.ModelSerializer):
    class Meta:
        model = User  
        fields = ('email', 'password', 'first_name', 'last_name')
    
    def validate(self, data):
        email = data.get('email')
        User = get_user_model()

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"msg_code": 22, "status_code": 400})

        return data


class CustomLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])

        if not user:
            raise serializers.ValidationError({"msg_code": 23, "status_code": 400})
        
        data['user'] = user
        return data

class UserDetailSerializer(serializers.ModelSerializer):
    savedBlog = BlogTopSerializer(many=True, read_only=True)
    class Meta:
        model = Profile
        fields = "__all__"  
    
    first_name = serializers.ReadOnlyField(source='user.first_name')
    last_name = serializers.ReadOnlyField(source='user.last_name')
    email = serializers.ReadOnlyField(source='user.email')

class FillProfileSerializer(serializers.ModelSerializer):
    isFilled = serializers.BooleanField(default=True) 
    class Meta:
        model = Profile
        fields = ["about","knownSkills",
        "location","photo",
        "unKnownSkills",
        #"languages","certificate",
        "university","isFilled" ] 


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name',"last_name","email","id"]


class GetProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Profile
        fields = "__all__" 

class TokenSerializer(serializers.Serializer):
    class Meta:
        model = Token
        fields = "__all__"  

class ChangePasswordSerializer(serializers.Serializer):
    oldPassword = CharField(required=True)
    newPassword = CharField(required=True)
    confirmPassword = CharField(required=False)

class AboutMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["about"]
