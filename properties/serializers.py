from rest_framework import serializers
from .models import PriceProperty


class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceProperty
        fields = '__all__'


class DistinctHotelsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceProperty
        fields = ('hotel_name')
