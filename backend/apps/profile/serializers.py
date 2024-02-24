from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.contrib.auth.backends import ModelBackend
from rest_framework.authtoken.models import Token
from .models import Profile

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
        fields = ["mentorInfo","studentInfo","isFilled" ] 
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name',"last_name","email","id"]


class GetProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Profile
        fields = ["mentorInfo","studentInfo","user"] 

class TokenSerializer(serializers.Serializer):
    class Meta:
        model = Token
        fields = "__all__"  