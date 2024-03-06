from django.db import models

from apps.textContent.models import TextContent
from django.core.validators import MaxValueValidator, MinValueValidator 

class SkillType(models.Model):
    SkillTypeId = models.IntegerField(primary_key = True)
    TextContentId = models.ForeignKey(TextContent , on_delete=models.CASCADE)

class Skill(models.Model):
    SkillId= models.IntegerField(primary_key = True)
    SkillTypeId = models.ForeignKey(SkillType , on_delete=models.CASCADE)
    TextContentId = models.ForeignKey(TextContent , on_delete=models.CASCADE)

