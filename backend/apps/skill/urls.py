from django.urls import include, path, re_path
from .views import (
    SkillTypeListView,
    SkillListView,
    GetSkillContentView,
    SkillListAllView
)

from django.urls.resolvers import URLPattern

urlpatterns = [
    path("get-type/", SkillTypeListView.as_view(), name="skill-type-list"),
    path("get-skill/", SkillListView.as_view(), name="skill-list"),
    path("get-skill-all/", SkillListAllView.as_view(), name="skill-list-all"),
    path("get-one-skill-content/", GetSkillContentView.as_view(), name="get-one-skill-content"),
]
