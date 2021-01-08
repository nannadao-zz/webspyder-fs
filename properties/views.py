from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from datetime import datetime, timezone, timedelta, date
from django.db.models import Avg, Func
from django.db import models
from rest_framework import serializers
from dateutil.relativedelta import relativedelta
import pandas as pd
import json

from .models import PriceProperty
from .serializers import PriceSerializer, DistinctHotelsSerializer


class DistinctView(ListAPIView):
    queryset = PriceProperty.objects.values_list('hotel_name', flat=True).distinct()
    permission_classes = (permissions.AllowAny, )
    serializer_class = PriceSerializer


class SearchView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        try:
            dateQuery = self.request.GET.get('date')
            queryset = PriceProperty.objects.all().filter(created_date=dateQuery)
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
            filterHotels = self.request.GET.getlist('filterHotels[]')
            if len(filterHotels) == 0:
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
            else:
                if(sortByQuery == 'hotel_name'):
                    if(descendingQuery == 'true'):
                        queryset = PriceProperty.objects.all().filter(created_date=dateQuery, hotel_name__in=filterHotels).order_by('-hotel_name')
                    else:
                        queryset = PriceProperty.objects.all().filter(created_date=dateQuery, hotel_name__in=filterHotels).order_by('hotel_name')
                elif(sortByQuery == 'room_type'):
                    if(descendingQuery == 'true'):
                        queryset = PriceProperty.objects.all().filter(created_date=dateQuery, hotel_name__in=filterHotels).order_by('-room_type')
                    else:
                        queryset = PriceProperty.objects.all().filter(created_date=dateQuery, hotel_name__in=filterHotels).order_by('room_type')
                elif(sortByQuery == 'room_price'):
                    if(descendingQuery == 'true'):
                        queryset = PriceProperty.objects.all().filter(created_date=dateQuery, hotel_name__in=filterHotels).order_by('-room_price')
                    else:
                        queryset = PriceProperty.objects.all().filter(created_date=dateQuery, hotel_name__in=filterHotels).order_by('room_price')

            serializer = PriceSerializer(queryset, many=True)
            return Response(serializer.data)
        except:
            return Response({'error': 'Cannot find any record'})


class HotelNamesView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        try:
            year = int(self.request.GET.get('year'))
            month = int(self.request.GET.get('month'))
            start_day = int(self.request.GET.get('start_day'))
            end_day = int(self.request.GET.get('end_day'))

            start_date = date(year, month, start_day)
            end_date = date(year, month, end_day)

            queryset = PriceProperty.objects\
                .filter(created_date__range=[start_date, end_date])\
                .values_list('hotel_name', flat=True)\
                .distinct()

            return Response(list(queryset))
        except:
            return Response({'error': 'Cannot find any record'})


class DashboardView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        try:
            filterHotel = self.request.GET.get('hotel')
            year = int(self.request.GET.get('year'))
            month = int(self.request.GET.get('month'))
            start_day = int(self.request.GET.get('start_day'))
            end_day = int(self.request.GET.get('end_day'))

            # Find this month and prev month ADR
            start_cur_month = datetime.today().replace(day=1)
            end_cur_month = datetime.today()
            # Find end of prev month by substract 1 day from this month start day
            end_prev_month = start_cur_month - timedelta(days=1)
            start_prev_month = end_prev_month.replace(day=1)

            # Filter the data of previous month & current month of a specific hotel
            current_month_data_avg = PriceProperty.objects\
                .filter(hotel_name=filterHotel, created_date__range=[start_cur_month, end_cur_month])\
                .aggregate(Avg('room_price'))

            prev_month_data_avg = PriceProperty.objects\
                .filter(hotel_name=filterHotel, created_date__range=[start_prev_month, end_prev_month])\
                .aggregate(Avg('room_price'))

            # Create dataframe for monthly rate
            day_delta = timedelta(days=1)
            start_date = date(year, month, start_day)
            end_date = date(year, month, end_day)

            month_days = list()
            month_rates = list()
            for i in range((end_date - start_date).days + 1):
                month_days.append(start_date + i*day_delta)
                month_rates.append(0)
            monthly_data = {'created_date': month_days, 'room_price': month_rates}
            seed_df = pd.DataFrame(monthly_data, columns=["created_date", "room_price"])

            # Turn model into dataframe
            line_graph_data = PriceProperty.objects\
                .filter(hotel_name=filterHotel, created_date__range=[start_date, end_date])\
                .values("created_date", "room_price")
            database_df = pd.DataFrame(line_graph_data)

            # Concat and override seed df with database
            monthly_rate_df = pd.concat([seed_df, database_df])\
                .sort_values(by=['created_date', 'room_price'])\
                .drop_duplicates(subset=['created_date'], keep='last')\
                .reset_index(drop=True)

            # Turn DataFrame into json
            monthly_result = monthly_rate_df.to_json(orient="records")
            monthly_rate_parsed = json.loads(monthly_result)

            # Sample data of past 6 months average dataframe
            months_list = list()
            months_avg = list()
            start_month = date.today().replace(day=1)
            for i in range(6):
                if(i == 0):
                    months_list.append(start_month + relativedelta(months=1, days=-1))
                    months_avg.append(0)
                else:
                    end_month = start_month - timedelta(days=1)
                    months_list.append(end_month)
                    months_avg.append(0)
                    start_month = end_month.replace(day=1)
            monthly_avg_data = {'created_date': months_list, 'room_price': months_avg}
            seed_avg_df = pd.DataFrame(monthly_avg_data, columns=["created_date", "room_price"])
            seed_avg_df['created_date'] = pd.to_datetime(seed_avg_df['created_date'])

            # Turn all data of a hotel in past 6 months into dataframe
            six_months_range_start = start_cur_month + relativedelta(months=-5)

            all_data = PriceProperty.objects\
                .filter(hotel_name=filterHotel, created_date__range=[six_months_range_start, end_cur_month])\
                .values('created_date', 'room_price')

            hotel_df = pd.DataFrame(all_data).set_index('created_date')
            # Translate created_date to DateTimeIndex format
            hotel_df.index = pd.to_datetime(hotel_df.index)
            database_avg_df = hotel_df.resample('M').mean()
            database_avg_df = database_avg_df.reset_index()

            monthly_avg_df = pd.concat([seed_avg_df, database_avg_df])\
                .sort_values(by=['created_date', 'room_price'])\
                .drop_duplicates(subset=['created_date'], keep='last')\
                .reset_index(drop=True)

            average_result = monthly_avg_df.to_json(orient="records")
            average_parsed = json.loads(average_result)

            results = list()
            results.append({'prev_avg': prev_month_data_avg,
                            'cur_avg': current_month_data_avg,
                            'line_graph': monthly_rate_parsed,
                            'bar_chart': average_parsed})
            return Response(results)
        except:
            return Response({'error': 'Something wrong happened'})
