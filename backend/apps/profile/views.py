from dj_rest_auth.registration.views import RegisterView
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from dj_rest_auth.views import LoginView
from .serializers import CustomRegisterSerializer,CustomLoginSerializer
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserDetailSerializer,FillProfileSerializer,GetProfileSerializer,TokenSerializer
from rest_framework.authtoken.models import Token
from .models import Profile,UnKnownSkills,Languages
from django.http.multipartparser import MultiPartParser
from apps.skill.models import Skill
import json
import uuid
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