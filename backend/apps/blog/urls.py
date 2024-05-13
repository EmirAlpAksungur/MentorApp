from django.urls import include, path, re_path
from .views import (
    BlogListWiew,
    BlogCreateWiew,
    BlogProfileListWiew,
    BlogDeleteView,
    BlogLikesWiew,
    BlogViewsWiew,
    BlogHomeWiew,
    BlogDetailsWiew
)

from django.urls.resolvers import URLPattern

urlpatterns = [
    path("get/<int:page>/", BlogListWiew.as_view(), name="blog-list"),
    path("get-profiler/<int:page>/", BlogProfileListWiew.as_view(), name="blog-list-profile"),
    path("post/", BlogCreateWiew.as_view(), name="blog-create"),
    path('delete/<uuid:uuid>/', BlogDeleteView.as_view(), name='blog-delete'),
    path("like/", BlogLikesWiew.as_view(), name="blog-like"),
    path("add-view/", BlogViewsWiew.as_view(), name="blog-view"),
    path("get-home/<int:page>/", BlogHomeWiew.as_view(), name="blog-home"),
    path("get-details/", BlogDetailsWiew.as_view(), name="blog-details"),
]
