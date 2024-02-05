from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.contrib.auth.backends import ModelBackend

class CustomRegisterSerializer(RegisterSerializer, serializers.ModelSerializer):
    class Meta:
        model = User  
        fields = ('email', 'password', 'first_name', 'last_name')
    
    def validate(self, data):
        email = data.get('email')
        User = get_user_model()

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Bu email zaten kullanımda.")

        return data


class CustomLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])

        if not user:
            raise serializers.ValidationError("Geçersiz e-posta veya şifre.")
        
        data['user'] = user
        return data

# emiralpaksungur@gmail.com
# Alp59300.!
# Emir Alp
# Aksungur