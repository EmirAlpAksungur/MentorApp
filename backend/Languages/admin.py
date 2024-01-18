from django.contrib import admin
from .models import Languages

@admin.register(Languages)
class LanguagesAdmin(admin.ModelAdmin):
    pass