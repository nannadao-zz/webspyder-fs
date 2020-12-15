# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from properties.models import PriceProperty

class ScraperPipeline(object):
    def process_item(self, item, spider):
        PriceProperty.objects.create(
            hotel_name=item['hotel_name'],
            room_type=item['room_type'],
            room_price=item['room_price'],
        )
        return item