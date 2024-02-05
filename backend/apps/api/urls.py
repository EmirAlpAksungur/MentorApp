from django.urls import include, path

urlpatterns = [
    path("languages/", include("apps.languages.urls")),
    path("translations/", include("apps.translations.urls")),
    path("profile/", include("apps.profile.urls")),
]
