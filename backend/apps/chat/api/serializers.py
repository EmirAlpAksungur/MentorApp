from rest_framework import serializers
from django.db.utils import IntegrityError
from apps.chat.models import Chat,Message
from apps.chat.views import get_user_contact
from apps.profile.serializers import UserSerializer



class ContactSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class ChatSerializer(serializers.ModelSerializer):
    participants = ContactSerializer(many=True)

    class Meta:
        model = Chat
        fields = ('id', 'messages', 'participants')
        read_only = ('id')

    def create(self, validated_data):
        participants = validated_data.pop('participants')
        try:
            chat = Chat()
            chat.id = validated_data.pop('id')
            chat.save()
            for userId in participants:
                contact = get_user_contact(userId)
                chat.participants.add(contact)
            chat.save()
            return chat
        except IntegrityError:
            raise serializers.ValidationError("Chat ")


class ChatListSerializer(serializers.ModelSerializer):
    participants = UserSerializer(many=True)

    class Meta:
        model = Chat
        fields = ('id', 'messages', 'participants')
        read_only = ('id')


class GetMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"