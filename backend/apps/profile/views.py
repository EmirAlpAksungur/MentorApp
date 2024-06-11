from dj_rest_auth.registration.views import RegisterView
from rest_framework.permissions import IsAuthenticated
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from dj_rest_auth.views import LoginView
from .serializers import CustomRegisterSerializer,CustomLoginSerializer
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import (
    UserDetailSerializer,
    FillProfileSerializer,
    GetProfileSerializer,
    TokenSerializer,
    ChangePasswordSerializer,
    AboutMeSerializer,
    PersonalInfoSerializer,
    SkillsSerializer
)
from rest_framework.authtoken.models import Token
from .models import Profile,UnKnownSkills,Languages
from django.http.multipartparser import MultiPartParser
from apps.skill.models import Skill
import json
import uuid
from rest_framework.authentication import TokenAuthentication
from apps.translations.models import Translations

class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer  

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = self.perform_create(serializer)

        return Response({'message': 'Registration successful'}, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        user = serializer.save(request=self.request)
        
        self.create_user_profile(user)
        
        return user

    def create_user_profile(self, user):
        Profile.objects.create(user=user)

class CustomLoginView(LoginView):
    serializer_class = CustomLoginSerializer

class CustomLogoutView(APIView):
    def get(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

class UserDetalisView(APIView):
    def get(self, request, *args, **kwargs):
        queryset = Profile.objects.filter(
            user=request.user.id,
        )
        serializer = UserDetailSerializer(queryset, many=True)
        return Response(serializer.data[0], status=status.HTTP_200_OK)

class GetProfileView(APIView):
    
    def get(self, request,page, *args, **kwargs):
        queryset = Profile.objects.filter(
            isFilled=True
        ).exclude(user=request.user)

        paginator = Paginator(queryset, 30)
        try:
            items = paginator.page(page)
        except PageNotAnInteger:
            items = paginator.page(1)
        except EmptyPage:
            items = paginator.page(paginator.num_pages)

        serializer = GetProfileSerializer(items, many=True)
        return Response({
            "length":queryset.count(),
            "data":serializer.data
        }, status=status.HTTP_200_OK)

class IsAuthView(APIView):
    def get(self, request, *args, **kwargs):
        queryset = Token.objects.filter(user=request.user)
        serializer = TokenSerializer(queryset, many=True)
        return Response(True, status=status.HTTP_200_OK)

class GetUnKnownSkillView(generics.ListAPIView):
    
    def post(self, request):
        language_id = request.data.get('LanguageId')
        SkillId = request.data.get('SkillId')
        unKnownSkill = UnKnownSkills.objects.filter(uuid=SkillId).first()
        print(unKnownSkill)
        print(unKnownSkill.skill.SkillId)
        print(unKnownSkill.skill.TextContentId)
        translation = Translations.objects.filter(TextContentId=unKnownSkill.skill.TextContentId, LanguageId=language_id).first()

        return Response({
            'content':translation.Translations,
            'level':unKnownSkill.level
        }, status=status.HTTP_200_OK)

class FollowView(APIView):
    def post(self, request):
        sender = request.user.id
        profile = Profile.objects.filter(user=sender).first()
        receiver = request.data.get('user_id')
        followed_users = list(profile.follows.all()) if profile.follows.exists() else []
        user_ids = [user.id for user in followed_users]
        if int(receiver) in user_ids:
            profile.follows.remove(receiver)
        else:
            profile.follows.add(receiver)
        
        return Response("Ok", status=status.HTTP_200_OK)


class SaveBlogView(APIView):
    def post(self, request):
        sender = request.user.id
        profile = Profile.objects.filter(user=sender).first()
        blog_id = request.data.get('uuid')
        saved_blog = list(profile.savedBlog.all()) if profile.savedBlog.exists() else []
        blog_ids = [blog.uuid for blog in saved_blog]
        if blog_id in blog_ids:
            profile.savedBlog.remove(blog_id)
        else:
            profile.savedBlog.add(blog_id)
        
        return Response("Ok", status=status.HTTP_200_OK)

class DeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        try:
            user = request.user
            user.delete()
            
            return Response({"detail": "User account deleted successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ChangePassword(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_object(self, queryset=None):
        return self.request.user

    def put(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            if not self.object.check_password(serializer.data.get("oldPassword")):
                return Response({"oldPassword": [1653]}, status=status.HTTP_400_BAD_REQUEST)
            
            self.object.set_password(serializer.data.get("newPassword"))
            self.object.save()
            return Response({"detail": "Password has been changed successfully."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AboutmeView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, *args, **kwargs):
        try:
            profile = Profile.objects.get(
                user=request.data.get('user_id')
            )
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = AboutMeSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AboutmeUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, *args, **kwargs):
        try:
            profile = Profile.objects.get(
                user=request.user
            )
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = AboutMeSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PersonalInfoView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, *args, **kwargs):
        try:
            profile = Profile.objects.get(
                user=request.data.get('user_id')
            )
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = PersonalInfoSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PersonalInfoUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, *args, **kwargs):
        try:
            profile = Profile.objects.get(
                user=request.user
            )
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = PersonalInfoSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SkillsView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, *args, **kwargs):
        try:
            profile = Profile.objects.get(
                user=request.data.get('user_id')
            )
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = SkillsSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SkillsUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, *args, **kwargs):
        try:
            profile = Profile.objects.get(
                user=request.user
            )
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = SkillsSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)