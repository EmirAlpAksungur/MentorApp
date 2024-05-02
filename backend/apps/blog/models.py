from django.db import models
from django.contrib.auth.models import User
class Blog(models.Model):
    uuid = models.CharField(max_length=100,primary_key = True)
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='blog')
    photo = models.BinaryField(null=True, editable=True)
    blog = models.CharField(max_length = 5000,default = "", blank = True)
    summary = models.CharField(max_length = 200,default = "", blank = True)
    title = models.CharField(max_length = 50,default = "", blank = True)
    likes = models.ManyToManyField(User ,related_name='likes')
    dislikes = models.ManyToManyField(User ,related_name='dislikes')
    views = models.ManyToManyField(User ,related_name='views')