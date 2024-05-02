from django.urls import include, path, re_path
from .views import (
    BlogListWiew,
    BlogCreateWiew,
    BlogProfileListWiew,
    BlogDeleteView
)

from django.urls.resolvers import URLPattern

urlpatterns = [
    path("get/", BlogListWiew.as_view(), name="blog-list"),
    path("get-profiler/", BlogProfileListWiew.as_view(), name="blog-list-profile"),
    path("post/", BlogCreateWiew.as_view(), name="blog-create"),
    path('delete/<uuid:uuid>/', BlogDeleteView.as_view(), name='blog-delete'),
]
