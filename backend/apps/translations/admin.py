from django.contrib import admin
from .models import Translations

@admin.register(Translations)
class TranslationsAdmin(admin.ModelAdmin):
    pass