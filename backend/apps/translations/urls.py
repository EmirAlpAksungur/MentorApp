from django.urls import include, path, re_path

from django.urls.resolvers import URLPattern
from .views import (
    GetTranslationsByIdView,
)

urlpatterns = [
    path("get/ids/", GetTranslationsByIdView.as_view(), name="LanguagesList"),
]
