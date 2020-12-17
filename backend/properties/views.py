from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from datetime import datetime, timezone, timedelta

from .models import PriceProperty
from .serializers import PriceSerializer, DistinctHotelsSerializer


class DistinctView(ListAPIView):
    queryset = PriceProperty.objects.values_list('hotel_name', flat=True).distinct()
    permission_classes = (permissions.AllowAny, )
    serializer_class = PriceSerializer


class SearchView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        print(type(self.request.GET.get('date')))
        try:
            dateQuery = self.request.GET.get('date')

            queryset = PriceProperty.objects.all().filter(created_date=dateQuery)
            print(queryset)
            serializer = PriceSerializer(queryset, many=True)
            return Response(serializer.data)
        except:
            return Response({'error': 'Cannot find any record'})


class SortView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        try:
            dateQuery = self.request.GET.get('date')
            sortByQuery = self.request.GET.get('sortBy')
            descendingQuery = self.request.GET.get('descending')

            if(sortByQuery == 'hotel_name'):
                if(descendingQuery == 'true'):
                    queryset = PriceProperty.objects.all().filter(created_date=dateQuery).order_by('-hotel_name')
                else:
                    queryset = PriceProperty.objects.all().filter(created_date=dateQuery).order_by('hotel_name')
            elif(sortByQuery == 'room_type'):
                if(descendingQuery == 'true'):
                    queryset = PriceProperty.objects.all().filter(created_date=dateQuery).order_by('-room_type')
                else:
                    queryset = PriceProperty.objects.all().filter(created_date=dateQuery).order_by('room_type')
            elif(sortByQuery == 'room_price'):
                if(descendingQuery == 'true'):
                    queryset = PriceProperty.objects.all().filter(created_date=dateQuery).order_by('-room_price')
                else:
                    queryset = PriceProperty.objects.all().filter(created_date=dateQuery).order_by('room_price')

            serializer = PriceSerializer(queryset, many=True)
            return Response(serializer.data)
        except:
            return Response({'error': 'Cannot find any record'})
