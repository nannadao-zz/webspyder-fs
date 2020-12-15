# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy
from scrapy_djangoitem import DjangoItem
from properties.models import PriceProperty

class ScraperItem(DjangoItem):
    django_model = PriceProperty