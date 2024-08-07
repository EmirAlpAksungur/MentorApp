from django.contrib.auth import get_user_model
from rest_framework import permissions,status
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)
from apps.chat.models import Chat
from apps.chat.views import get_user_contact
from .serializers import ChatSerializer,ChatListSerializer,GetMessageSerializer
from rest_framework.views import APIView
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.response import Response
User = get_user_model()


class ChatListView(ListAPIView):
    serializer_class = ChatListSerializer
    permission_classes = (permissions.AllowAny, )

    def get_queryset(self):
        queryset = Chat.objects.all()
        user = self.request.user
        print(user)
        if user is not None:
            contact = get_user_contact(user.id)
            print(contact)
            queryset = contact.chats.all()
        return queryset


class ChatDetailView(RetrieveAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.AllowAny, )


class ChatCreateView(CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated, )


class ChatUpdateView(UpdateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated, )


class ChatDeleteView(DestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated, )


class GetPrevMessges(APIView):
    
    def get(self, request,id,time,page, *args, **kwargs):
        chat = get_object_or_404(Chat, id=id)
        messages = chat.messages.filter(timestamp__lt=time).order_by('-timestamp')
        paginator = Paginator(messages, 30)
        try:
            items = paginator.page(page)
        except PageNotAnInteger:
            items = paginator.page(1)
        except EmptyPage:
            items = paginator.page(paginator.num_pages)
        items = list(items) 
        items.reverse()
        serializer = GetMessageSerializer(items, many=True)
        return Response({
            "length":messages.count(),
            "data":serializer.data
        }, status=status.HTTP_200_OK)