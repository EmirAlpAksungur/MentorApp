from django.contrib.auth import get_user_model
from django.shortcuts import render, get_object_or_404
from .models import Chat
User = get_user_model()


def get_last_10_messages(chatId):
    chat = get_object_or_404(Chat, id=chatId)
    return chat.messages.order_by('-timestamp').all()[:10]


def get_user_contact(userId):
    return get_object_or_404(User, id=userId)


def get_current_chat(chatId):
    return get_object_or_404(Chat, id=chatId)


def get_chats(user_id):
    chats = Chat.objects.filter(participants__id=user_id)
    if not chats:
        raise ObjectDoesNotExist("No chats found for this user.")
    return chats