from django.db import models

from django.contrib.auth.models import User
from apps.location.models import City
from apps.university.models import University
from apps.skill.models import Skill
from django.core.validators import MaxValueValidator, MinValueValidator 
# Create your models here.

class KnownSkills(models.Model):
    uuid = models.CharField(max_length=32,primary_key = True)
    skill = models.ManyToManyField(Skill)
    
class UnKnownSkills(models.Model):
    uuid = models.CharField(max_length=32,primary_key = True)
    skill = models.ManyToManyField(Skill)
    level = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])
    
class Certificate(models.Model):
    uuid = models.CharField(max_length=32,primary_key = True)
    image = models.ImageField(upload_to='images/certificate')
    comment = models.CharField(max_length = 500, blank = True ,null = True)
    
class Languages(models.Model):
    uuid = models.CharField(max_length=32,primary_key = True)
    name = models.CharField(max_length = 50, blank = True ,null = True)
    level = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])
    
class References(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name='references')
    comment = models.CharField(max_length = 500, blank = True ,null = True)
    likes = models.IntegerField(default = 0)
    dislikes = models.IntegerField(default = 0)

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name='profil')
    isFilled = models.BooleanField(default=False)
    photo = models.ImageField(upload_to='images/profile', null= True)
    about = models.CharField(max_length = 500,default = "", blank = True)
    location =  models.ForeignKey(City, on_delete=models.CASCADE, null= True)
    university =  models.ManyToManyField(University, blank= False)
    languages = models.ForeignKey(Languages, on_delete=models.CASCADE, null= True)
    certificate = models.ForeignKey(Certificate,on_delete=models.CASCADE, null= True)
    knownSkills = models.ForeignKey(KnownSkills,on_delete=models.CASCADE, null= True)
    unKnownSkills = models.ForeignKey(UnKnownSkills,on_delete=models.CASCADE, null= True)
    references =  models.ForeignKey(References,on_delete=models.CASCADE, null= True)
    likes = models.IntegerField(default = 0)
    dislikes = models.IntegerField(default = 0)
    