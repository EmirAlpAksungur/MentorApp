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
    AboutMeSerializer
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

class FillProfileView(APIView):

    def post(self, request):
        item = Profile.objects.get(user=request.user)
        parser = MultiPartParser(request.META, request, request.upload_handlers)

        unKnownSkills = request.POST.getlist('unKnownSkills')  
        unKnownSkillsPk = []
        for skill in unKnownSkills:
            skillDict = json.loads(skill)
            random_uuid = uuid.uuid4()
            unKnownSkillsPk.append(str(random_uuid))
            skillDict['uuid'] = str(random_uuid)
            skill_instance = Skill.objects.get(pk=int(skillDict["skill"]))
            saveInstance = UnKnownSkills(
                skill=skill_instance,
                level=int(skillDict["level"]),
                uuid=skillDict["uuid"]
            )
            saveInstance.save()

        languages = request.POST.get('languages')  
        languagesPk = []
        print(languages)
        for language in json.loads(languages):
            print(language)
            random_uuid = uuid.uuid4()
            languagesPk.append(language["uuid"])
            saveInstance = Languages(
                uuid=language["uuid"],
                name=language["name"],
                level=int(language["level"])
            )
            saveInstance.save()

        certificates = request.POST.get('certificate')  
        certificatePk = []
        print(certificates)
        # for certificate in json.loads(certificates):
        #     print(certificate)
        #     random_uuid = uuid.uuid4()
        #     languagesPk.append(certificate["uuid"])
        #     saveInstance = certificate(
        #         uuid=certificate["uuid"],
        #         image=certificate["image"],
        #         comment=certificate["comment"]
        #     )
        #     saveInstance.save()
        data = {
            'about': request.POST.get('about'),
            'location': request.POST.get('location'),
            'university': [int(id) for id in request.POST.getlist('university')],
            'languages': [str(id) for id in languagesPk],
            # 'certificate': request.POST.getlist('certificate'),
            'knownSkills': [int(skill_id) for skill_id in request.POST.getlist('knownSkills')],  
            'unKnownSkills': [str(id) for id in unKnownSkillsPk],
            'photo' : request.POST.get('photo')
        }
        
        serializer = FillProfileSerializer(instance=item, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
            print(profile)
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = AboutMeSerializer(profile)
        print(serializer)
        print(serializer.data)
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