from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from rest_framework.views import APIView
from .models import Blog
from django.http.multipartparser import MultiPartParser
from .serializers import BlogSerializer,BlogGetSerializer,BlogDeleteSerializer
from django.shortcuts import get_object_or_404
from apps.profile.models import Profile
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

class BlogListWiew(generics.ListAPIView):
    def get_queryset(self):
        return Blog.objects.all()
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = BlogGetSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class BlogProfileListWiew(generics.ListAPIView):

    def get(self, request,page, *args, **kwargs):
        user = request.user.id
        queryset =  Blog.objects.filter(user=user)
        paginator = Paginator(queryset, 10)
        try:
            items = paginator.page(page)
        except PageNotAnInteger:
            items = paginator.page(1)
        except EmptyPage:
            items = paginator.page(paginator.num_pages)

        serializer = BlogGetSerializer(items, many=True)
        return Response({
            "length":queryset.count(),
            "data":serializer.data
        }, status=status.HTTP_200_OK)


class BlogCreateWiew(generics.CreateAPIView):

    def post(self, request):
        parser = MultiPartParser(request.META, request, request.upload_handlers)
        data = {
            'user': request.user.id,
            'uuid': request.POST.get('uuid'), 
            'photo' : request.POST.get('photo'),
            'blog': request.POST.get('blog'),
            'title': request.POST.get('title'),
            'summary': request.POST.get('summary'),
        }
        try:
            blog_instance = Blog.objects.get(uuid=request.POST.get('uuid'))
            serializer = BlogSerializer(instance=blog_instance,data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Blog.DoesNotExist:
            serializer = BlogSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class BlogDeleteView(APIView):
    def delete(self, request, uuid):
        try:
            blog = Blog.objects.get(uuid=uuid)
            blog.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Blog.DoesNotExist:
            return Response({"error": "Blog not found"}, status=status.HTTP_404_NOT_FOUND)

class BlogLikesWiew(generics.CreateAPIView):

    def post(self, request):
        data = request.data
        uuid = data.get('uuid')
        my_from = data.get('from')
        my_to = data.get('to')
        user_id = request.user.id
        blog_instance = get_object_or_404(Blog, uuid=uuid)

        if my_from == 1:
            blog_instance.likes.remove(user_id)
        elif my_from == -1:
            blog_instance.dislikes.remove(user_id)

        if my_to == 1:
            blog_instance.likes.add(user_id)
        elif my_to == -1:
            blog_instance.dislikes.add(user_id)
        
        return Response("OK")


class BlogViewsWiew(generics.CreateAPIView):

    def post(self, request):
        user_id = request.user.id
        uuid = request.data.get('uuid')
        blog_instance = get_object_or_404(Blog, uuid=uuid)
        blog_instance.views.add(user_id)

        return Response("OK")

class BlogHomeWiew(APIView):
    serializer_class = BlogGetSerializer

    def get_queryset(self):
        profile = Profile.objects.filter(user=self.request.user.id).first()
        followed_users = profile.follows.all()
        return Blog.objects.filter(user__in=followed_users)
    def post(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class BlogDetailsWiew(generics.CreateAPIView):

    def post(self, request):
        uuid = request.data.get('uuid')
        blog_instance = get_object_or_404(Blog, uuid=uuid)
        serializer = BlogGetSerializer(blog_instance)
        return Response(serializer.data)