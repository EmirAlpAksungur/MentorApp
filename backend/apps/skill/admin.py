from django.contrib import admin
from .models import SkillType,Skill

@admin.register(SkillType)
class SkillTypeAdmin(admin.ModelAdmin):
    pass

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    pass
