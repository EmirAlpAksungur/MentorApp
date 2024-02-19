from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView
from .serializers import CustomRegisterSerializer,CustomLoginSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserDetailSerializer,FillProfileSerializer,GetProfileSerializer,TokenSerializer
from rest_framework.authtoken.models import Token
from .models import Profile

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
        serializer = FillProfileSerializer(instance=item, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetProfileView(APIView):
    
    def get(self, request, *args, **kwargs):
        queryset = Profile.objects.filter(
            isFilled=True
        ).exclude(user=request.user)
        serializer = GetProfileSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class IsAuthView(APIView):
    def get(self, request, *args, **kwargs):
        queryset = Token.objects.filter(user=request.user)
        serializer = TokenSerializer(queryset, many=True)
        return Response(True, status=status.HTTP_200_OK)