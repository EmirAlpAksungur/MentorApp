from django.contrib import admin
from django.urls import path, include,re_path
urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/v1/",include('apps.api.urls'), name = 'api'),
    re_path("api/v1/healt-check/", include('health_check.urls')),
]