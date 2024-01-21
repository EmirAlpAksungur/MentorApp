from django.urls import include, path, re_path
from .views import (
    LanguagesListView,
)

from django.urls.resolvers import URLPattern

urlpatterns = [
    path("get/", LanguagesListView.as_view(), name="LanguagesList"),
]
