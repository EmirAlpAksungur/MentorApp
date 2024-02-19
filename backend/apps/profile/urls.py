from dj_rest_auth.registration.views import RegisterView
from django.urls import path
from .views import CustomRegisterView,CustomLoginView,CustomLogoutView,UserDetalisView,FillProfileView,GetProfileView,IsAuthView

urlpatterns = [
    path("register/", CustomRegisterView.as_view(), name="rest_register"),
    path("login/", CustomLoginView.as_view(), name="rest_login"),
    path("logout/", CustomLogoutView.as_view(), name="rest_logout"),
    path("user-details/", UserDetalisView.as_view(), name="rest_user_details"),
    path("fill-profile-data/", FillProfileView.as_view(), name="rest_user_details"),
    path("get-profile/", GetProfileView.as_view(), name="rest_user_details"),
    path("is-auth/", IsAuthView.as_view(), name="rest_user_details"),
]


