from django.contrib.auth import get_user_model
from django.db import models
import time
User = get_user_model()

class Message(models.Model):
    contact = models.ForeignKey(
        User, related_name='messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.BigIntegerField(default=0)
    is_sent = models.BooleanField(default=False)
    is_delivered = models.BooleanField(default=False) 
    is_read = models.BooleanField(default=False) 
    def save(self, *args, **kwargs):
        if not self.timestamp:
            self.timestamp = int(time.time()) * 1000
        super(Message, self).save(*args, **kwargs)
    def __str__(self):
        return self.contact.username
    


class Chat(models.Model):
    id=models.CharField(max_length=255, primary_key=True)
    participants = models.ManyToManyField(
        User, related_name='chats', blank=True)
    messages = models.ManyToManyField(Message, blank=True, related_name='messages')
    last_message = models.ForeignKey(Message, blank=True,null=True, on_delete=models.CASCADE, related_name='last_message')

    def __str__(self):
        return "{}".format(self.pk)