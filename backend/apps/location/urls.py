from django.urls import include, path, re_path

from django.urls.resolvers import URLPattern
from .views import (
    GetCountriesView,
    GetCityView,
    GetCityDetailsView
)

urlpatterns = [
    path("country/get/", GetCountriesView.as_view(), name="country-list"),
    path("city/get/", GetCityView.as_view(), name="city-list"),
    path("city/details/<int:CityId>/<int:language_id>/", GetCityDetailsView.as_view(), name="city-details"),
]
