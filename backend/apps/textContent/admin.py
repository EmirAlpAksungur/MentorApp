from django.contrib import admin
from .models import TextContent

@admin.register(TextContent)
class TextContentAdmin(admin.ModelAdmin):
    pass