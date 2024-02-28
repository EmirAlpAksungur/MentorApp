from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

class Message(models.Model):
    contact = models.ForeignKey(
        User, related_name='messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.contact.username
    


class Chat(models.Model):
    id=models.CharField(max_length=255, primary_key=True)
    participants = models.ManyToManyField(
        User, related_name='chats', blank=True)
    messages = models.ManyToManyField(Message, blank=True)

    def __str__(self):
        return "{}".format(self.pk)