from dj_rest_auth.registration.views import RegisterView
from django.urls import path
from .views import (
    CustomRegisterView,
    CustomLoginView,
    CustomLogoutView,
    UserDetalisView,
    FillProfileView,
    GetProfileView,
    IsAuthView,
    GetUnKnownSkillView,
    FollowView,
    SaveBlogView,
    DeleteView,
    ChangePassword,
    AboutmeView,
    AboutmeUpdateView
)
urlpatterns = [
    path("register/", CustomRegisterView.as_view(), name="rest_register"),
    path("login/", CustomLoginView.as_view(), name="rest_login"),
    path("logout/", CustomLogoutView.as_view(), name="rest_logout"),
    path("user-details/", UserDetalisView.as_view(), name="rest_user_details"),
    path("fill-profile-data/", FillProfileView.as_view(), name="rest_user_details"),
    path("get-profile/<int:page>/", GetProfileView.as_view(), name="rest_user_details"),
    path("is-auth/", IsAuthView.as_view(), name="rest_user_details"),
    path("get-un-known-skill-content/", GetUnKnownSkillView.as_view(), name="get_un_known_skill_content"),
    path("follow/", FollowView.as_view(), name="follow"),
    path("save-blog/", SaveBlogView.as_view(), name="save-blog"),
    path("delete/", DeleteView.as_view(), name="delete"),
    path("change-password/", ChangePassword.as_view(), name="change_password"),
    path("about-me/", AboutmeView.as_view(), name="about_me"),
    path("about-me-update/", AboutmeUpdateView.as_view(), name="about_me__update")

]


