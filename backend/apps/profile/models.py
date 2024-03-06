from django.db import models

from django.contrib.auth.models import User
from apps.location.models import City
from apps.university.models import University
from apps.skill.models import Skill
from django.core.validators import MaxValueValidator, MinValueValidator 
# Create your models here.

class KnownSkills(models.Model):
    skill = models.ManyToManyField(Skill)
    
class UnKnownSkills(models.Model):
    skill = models.ManyToManyField(Skill)
    level = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])
    
class Certificate(models.Model):
    image = models.ImageField(upload_to='images/certificate')
    comment = models.CharField(max_length = 500, blank = True ,null = True)
    
class Languages(models.Model):
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
    location =  models.ForeignKey(City, on_delete=models.SET_DEFAULT,default=None,null = True)
    university =  models.ManyToManyField(University)
    about = models.CharField(max_length = 500, blank = True ,null = True)
    languages = models.ForeignKey(Languages, on_delete=models.SET_DEFAULT,default=None,null = True)
    knownSkills = models.ForeignKey(KnownSkills,on_delete=models.CASCADE)
    unKnownSkills = models.ForeignKey(UnKnownSkills,on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='images/profile')
    certificate = models.ForeignKey(Certificate,on_delete=models.CASCADE)
    likes = models.IntegerField(default = 0)
    dislikes = models.IntegerField(default = 0)
    references =  models.ForeignKey(References,on_delete=models.CASCADE)
    