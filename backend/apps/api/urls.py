from django.urls import include, path

urlpatterns = [
    path("languages/", include("apps.languages.urls")),
    path("translations/", include("apps.translations.urls")),
    path("profile/", include("apps.profile.urls")),
    path("chat/", include("apps.chat.api.urls")),
    path("location/", include("apps.location.urls")),
    path("university/", include("apps.university.urls")),
    path("skill/", include("apps.skill.urls")),
]
