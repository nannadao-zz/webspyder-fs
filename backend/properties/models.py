from django.db import models
from django.utils import timezone

class PriceProperty(models.Model):
  created_date = models.DateField(auto_now=True)
  hotel_name = models.CharField(max_length=250, null=False)
  room_type = models.CharField(max_length=250, null=False)
  room_price = models.CharField(max_length=250, null=False)

  def __str__(self):
    return self.hotel_name