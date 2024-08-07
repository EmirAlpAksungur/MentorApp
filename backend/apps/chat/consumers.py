from django.contrib.auth import get_user_model
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from .models import Message, Chat
from .views import get_last_10_messages, get_user_contact, get_current_chat, get_chats
from .serializers import GetChatSerializer
from channels.layers import get_channel_layer
from django.shortcuts import get_object_or_404
User = get_user_model()


class ChatConsumer(WebsocketConsumer):

    def notify_users(self, chat, message):
        channel_layer = get_channel_layer()
        for participant in chat.participants.all():
            room_group_name = f'chat_all_{participant.id}'
            content = {
                'command': 'last_message',
                'message': message,
                'chat_id': chat.id
            }
            async_to_sync(channel_layer.group_send)(
                room_group_name,
                {
                    'type': 'last_message',
                    'message': content
                }
            )

    def fetch_messages(self, data):
        messages = get_last_10_messages(data['chatId'])
        content = {
            'command': 'messages',
            'messages': self.messages_to_json(messages)
        }
        self.send_message(content)

    def new_message(self, data):
        user_contact = get_user_contact(data['from'])
        message = Message.objects.create(
            contact=user_contact,
            content=data['message'],
            is_sent=True)
        current_chat = get_current_chat(data['chatId'])
        current_chat.messages.add(message)
        current_chat.last_message = message
        current_chat.save()
        content = {
            'command': 'new_message',
            'message': self.message_to_json(message)
        }
        self.notify_users(current_chat, self.message_to_json(message))
        return self.send_chat_message(content)

    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result

    def message_to_json(self, message):
        return {
            'id': message.id,
            'contact': message.contact.id,
            'content': message.content,
            'is_read':message.is_read,
            'is_delivered':message.is_delivered,
            'is_sent':message.is_sent,
            'timestamp': message.timestamp
        }


    def message_readed_return_message(self, chat, message):
        split_values = chat.split('_')
        channel_layer = get_channel_layer()
        for participant in split_values:
            room_group_name = f'chat_all_{participant}'
            content = {
                'command': 'message_readed',
                'message':  self.message_to_json(message),
                'chat_id': chat
            }
            async_to_sync(channel_layer.group_send)(
                room_group_name,
                {
                    'type': 'message_readed_return',
                    'message': content
                }
            )


    def message_readed(self, message):
        try:
            updated_message = get_object_or_404(Message, id=message["message"])
            updated_message.is_read = True
            updated_message.save()
            self.message_readed_return_message(message["chat_id"],updated_message)
        except:
            pass


    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message,
        'message_readed':message_readed
    }

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        print(f"Received data: {text_data}")

        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_chat_message(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))


class ChatLastConsumer(WebsocketConsumer):
    def fetch_chats(self, data):
        chats = get_chats(data['user_id'])
        serializer = GetChatSerializer(chats, many=True)
        content = {
            'command': 'fetch_chats',
            'data': serializer.data
        }
        self.send_message(content)

    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result

    def message_to_json(self, message):
        return {
            'id': message.id,
            'contact': message.contact.id,
            'content': message.content,
            'is_read':message.is_read,
            'is_delivered':message.is_delivered,
            'is_sent':message.is_sent,
            'timestamp': message.timestamp
        }

    def message_readed_return(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))

    def message_delivered_return(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))

    def message_delivered_return_message(self, chat, message):
        split_values = chat.split('_')
        channel_layer = get_channel_layer()
        for participant in split_values:
            room_group_name = f'chat_all_{participant}'
            content = {
                'command': 'message_delivered',
                'message':  self.message_to_json(message),
                'chat_id': chat
            }
            async_to_sync(channel_layer.group_send)(
                room_group_name,
                {
                    'type': 'message_delivered_return',
                    'message': content
                }
            )


    def message_delivered(self, message):
        try:
            updated_message = get_object_or_404(Message, id=message["message"])
            updated_message.is_delivered = True
            updated_message.save()
            self.message_delivered_return_message(message["chat_id"],updated_message)
        except:
            pass

    commands = {
        'fetch_chats': fetch_chats,
        'message_delivered':message_delivered
    }

    def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.room_group_name = 'chat_all_%s' % self.user_id
        print(self.room_group_name)
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        print("++++++++")
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_chat_message(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))

    def last_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))

