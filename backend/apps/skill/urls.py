from django.urls import include, path, re_path
from .views import (
    SkillTypeListView,
    SkillListView,
    SkillListAllView,
)

from django.urls.resolvers import URLPattern

urlpatterns = [
    path("get-type/", SkillTypeListView.as_view(), name="SkillTypeList"),
    path("get-skill/", SkillListView.as_view(), name="SkillList"),
    path("get-skill-all/", SkillListAllView.as_view(), name="SkillListAll"),
]
