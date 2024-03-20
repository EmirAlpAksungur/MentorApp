from rest_framework import generics,  status
from rest_framework.response import Response

from .models import University
from .serializers import GetUniversitySerializer,UniversityDetailSerializer

class GetUniversityView(generics.ListAPIView):
    def post(self, request):
        cities = University.objects.filter(CityId=request.data.get('CityId'))
        serializer = GetUniversitySerializer(cities, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetUniversityInfoView(generics.RetrieveAPIView):
    queryset = University.objects.all()
    serializer_class = UniversityDetailSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        response_data = {
            'UniversityId': instance.UniversityId,
            'CityId': instance.CityId.CityId,
            'CountryId': instance.CityId.CountryId.CountryId,
        }

        return Response(response_data)

    def get(self, request, *args, **kwargs):
        try:
            return super().get(request, *args, **kwargs)
        except University.DoesNotExist:
            return Response({'error': 'University not found'}, status=status.HTTP_404_NOT_FOUND)