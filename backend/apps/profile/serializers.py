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
from datetime import datetime
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

class PersonalInfoSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    dateOfBirth = serializers.IntegerField()
    class Meta:
        model = Profile
        fields = ["dateOfBirth","profession","location","nationality","github","linkedin","twitter","email","first_name","last_name"]
    
    def validate_dateOfBirth(self, value):
        try:
            datetime.fromtimestamp(value / 1000)
        except ValueError:
            raise serializers.ValidationError("Invalid timestamp format")
        return value
        
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        email = user_data.get('email')
        first_name = user_data.get('first_name')
        last_name = user_data.get('last_name')

        if email:
            instance.user.email = email
        if first_name:
            instance.user.first_name = first_name
        if last_name:
            instance.user.last_name = last_name

        instance.user.save()

        instance.dateOfBirth = validated_data.get('dateOfBirth', instance.dateOfBirth)
        instance.profession = validated_data.get('profession', instance.profession)
        instance.location = validated_data.get('location', instance.location)
        instance.nationality = validated_data.get('nationality', instance.nationality)
        instance.github = validated_data.get('github', instance.github)
        instance.linkedin = validated_data.get('linkedin', instance.linkedin)
        instance.twitter = validated_data.get('twitter', instance.twitter)

        instance.save()
        return instance

class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["knownSkills"]
    

class UnknownSkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnKnownSkills
        fields = ['uuid', 'skill', 'level']

    def create(self, validated_data):
        unknown_skill = UnKnownSkills.objects.create(**validated_data)
        return unknown_skill

    def update(self, instance, validated_data):
        instance.skill = validated_data.get('skill', instance.skill)
        instance.level = validated_data.get('level', instance.level)
        instance.save()
        return instance

class UnknownSkillsProfileSerializer(serializers.ModelSerializer):
    unKnownSkills = UnknownSkillsSerializer(many=True) 

    class Meta:
        model = Profile
        fields = ['id', 'user', 'unKnownSkills']


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["photo"]
    
