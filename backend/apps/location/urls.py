from django.urls import include, path, re_path

from django.urls.resolvers import URLPattern
from .views import (
    GetCountriesView,
    GetCityView
)

urlpatterns = [
    path("country/get/", GetCountriesView.as_view(), name="CountryList"),
    path("city/get/", GetCityView.as_view(), name="CityList"),
]
