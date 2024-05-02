from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from rest_framework.views import APIView
from .models import Blog
from django.http.multipartparser import MultiPartParser
from .serializers import BlogSerializer,BlogGetSerializer,BlogDeleteSerializer
class BlogListWiew(generics.ListAPIView):
    def get_queryset(self):
        return Blog.objects.all()
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = BlogGetSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class BlogProfileListWiew(generics.ListAPIView):

    def get(self, request, *args, **kwargs):
        user = request.user.id
        queryset =  Blog.objects.filter(user=user)
        serializer = BlogGetSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


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
