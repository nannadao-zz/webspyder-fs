from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.loader import ItemLoader
from scrapy.loader.processors import TakeFirst

from scraper.items import ScraperItem

class PriceSpider(CrawlSpider):
  name = "booking"
  allowed_domains = ["booking.com"]
  start_url = [
    "https://www.booking.com/city/fi/helsinki.en-gb.html?label=gen173nr-1BCAEoggI46AdIM1gEaEiIAQGYAQm4AQfIAQzYAQHoAQGIAgGoAgO4Aveuvv4FwAIB0gIkMWZkODFkYTYtY2M5Yy00N2E1LTlhNGItNmQ0YjZmZjkxYTFk2AIF4AIB;sid=d2a36dfc62f9e56716f35a50ec9c0d1d;breadcrumb=searchresults_irene;srpvid=76826ad4b0170334&"
  ]

  def parse(self, response):
    property_loader = ItemLoader(item=ScraperItem(), response=response)

    yield property_loader.load_item()