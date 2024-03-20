from django.urls import include, path, re_path

from django.urls.resolvers import URLPattern
from .views import (
    GetUniversityView,
    GetUniversityInfoView
)

urlpatterns = [
    path("get/", GetUniversityView.as_view(), name="UniversityList"),
     path('get_university_info/<int:pk>/', GetUniversityInfoView.as_view(), name='get_university_info'),
]
