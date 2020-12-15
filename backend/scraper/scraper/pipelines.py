# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from word2number import w2n

class ScraperPipeline:
    def process_item(self, item, spider):
        item.save()
        return item

class PropertyHotelPipeline(object):
    def process_item(self, item, spider):
        if item.get('hotel_name'):
            item['hotel_name'] = item['hotel_name'].strip()
            return item

class PropertyRoomTypePipeline(object):
    def process_item(self, item, spider):
        if item.get("room_type"):
            item['room_type'] = item['room_type'].strip()
            return item

class PropertyRoomPricePipeline(object):
    def process_item(self, item, spider):
        if item.get("room_price"):
            item['room_price'] = int(item['room_price'])
            return item