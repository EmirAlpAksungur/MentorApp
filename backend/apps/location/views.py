from rest_framework import generics,  status
from rest_framework.response import Response

from .models import Country,City
from apps.translations.models import Translations
from .serializers import GetCountriesSerializer,GetCitySerializer,GetCityDetailsSerializer

class GetCountriesView(generics.ListAPIView):
    def post(self, request):
        language_id = request.data.get('LanguageId')
        countries = Country.objects.all()
        
        country_data = []
        for country in countries:
            translation = Translations.objects.filter(TextContentId=country.TextContentId, LanguageId=language_id).first()
            country_serializer = GetCountriesSerializer(country)
            country_data.append({
                **country_serializer.data,
                'name': translation.Translations if translation else None
            })

        return Response(country_data, status=status.HTTP_200_OK)


class GetCityView(generics.ListAPIView):
    def post(self, request):
        cities = City.objects.filter(CountryId=request.data.get('CountryId'))
        serializer = GetCitySerializer(cities, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class GetCityDetailsView(generics.ListAPIView):
    def get(self,request,CityId,language_id):
        queryset = City.objects.filter(CityId=CityId)
        serializer = GetCityDetailsSerializer(queryset, many=True)
        translation = Translations.objects.filter(TextContentId=serializer.data[0]["CountryId"]["TextContentId"]["TextContentId"], LanguageId=language_id).first()
        print(translation.Translations)
        serializer.data[0]["CountryId"]["TextContentId"]["translation"] = translation.Translations
        return Response(serializer.data[0], status=status.HTTP_200_OK)