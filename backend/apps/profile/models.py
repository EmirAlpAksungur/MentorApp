from django.db import models

from django.contrib.auth.models import User
from apps.location.models import City
from apps.university.models import University
from apps.skill.models import Skill
from apps.blog.models import Blog
from django.core.validators import MaxValueValidator, MinValueValidator ,FileExtensionValidator
# Create your models here.

class UnKnownSkills(models.Model):
    uuid = models.CharField(max_length=100,primary_key = True)
    skill = models.ForeignKey(Skill,on_delete=models.CASCADE)
    level = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])
    
class Certificate(models.Model):
    uuid = models.CharField(max_length=100,primary_key = True)
    image = models.BinaryField(null=True, editable=True)
    comment = models.CharField(max_length = 500, blank = True ,null = True)
    
class Languages(models.Model):
    uuid = models.CharField(max_length=100,primary_key = True)
    name = models.CharField(max_length = 50, blank = True ,null = True)
    level = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])
    
class References(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name='references')
    comment = models.CharField(max_length = 500, blank = True ,null = True)
    likes = models.IntegerField(default = 0)
    dislikes = models.IntegerField(default = 0)

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name='profil')
    follows = models.ManyToManyField(User,related_name='follow')
    isFilled = models.BooleanField(default=False)
    profession = models.CharField(max_length = 100, blank = True ,null = True)
    photo = models.BinaryField(null=True, editable=True)
    about = models.TextField(default = "", blank = True)
    location =  models.ForeignKey(City, on_delete=models.CASCADE, null= True)
    university =  models.ManyToManyField(University, blank= False)
    languages = models.ManyToManyField(Languages)
    certificate = models.ManyToManyField(Certificate)
    knownSkills = models.ManyToManyField(Skill)
    unKnownSkills = models.ManyToManyField(UnKnownSkills)
    references =  models.ManyToManyField(References)
    likes = models.IntegerField(default = 0)
    dislikes = models.IntegerField(default = 0)
    savedBlog = models.ManyToManyField(Blog)
    #add date of birth
    