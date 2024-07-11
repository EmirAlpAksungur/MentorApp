# chat/routing.py
from django.urls import re_path

from .consumers import ChatConsumer,ChatLastConsumer

websocket_urlpatterns = [
    re_path(r'^ws/chat/(?P<room_name>[^/]+)/$', ChatConsumer.as_asgi()),
    re_path(r'^ws/chat_all/(?P<user_id>[^/]+)/$', ChatLastConsumer.as_asgi()),
]
