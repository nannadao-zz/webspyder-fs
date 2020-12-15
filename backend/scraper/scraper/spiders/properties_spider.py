from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.loader import ItemLoader
from scrapy.selector import Selector
from scrapy.http import TextResponse, Request
from scraper.scraper.items import ScraperItem

import re
import time
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from scraper.scraper.items import ScraperItem

class PriceSpider(CrawlSpider):
  name = "booking"
  allowed_domains = ["booking.com"]
  start_urls = ['https://www.booking.com/city/fi/helsinki.en-gb.html?label=gen173nr-1BCAEoggI46AdIM1gEaEiIAQGYAQm4AQfIAQzYAQHoAQGIAgGoAgO4Aveuvv4FwAIB0gIkMWZkODFkYTYtY2M5Yy00N2E1LTlhNGItNmQ0YjZmZjkxYTFk2AIF4AIB;sid=d2a36dfc62f9e56716f35a50ec9c0d1d;breadcrumb=searchresults_irene;srpvid=76826ad4b0170334&']
  page_urls = []
  options = Options()
  options.add_argument("--disable-notifications")
  options.add_argument("--incognito")
  options.add_argument("--disable-extensions")
  options.add_argument("--disable-gpu")
  options.add_argument("--disable-infobars")
  options.add_argument("--disable-web-security")
  options.add_argument("--no-sandbox")
  
  driver = webdriver.Chrome(chrome_options=options)
  driver.implicitly_wait(2)

  ## Function to pagination urls
  def start_requests(self):
    
    
    ## Get today date and 1 day after
    dt = datetime.now()

    ## Set up for checkin field
    checkin_monthyear_input = f'{dt.strftime("%B")} {dt.strftime("%Y")}'
    checkin_date_input = f'{dt.day}, {dt.strftime("%A")}'

    print(checkin_date_input)

    self.driver.get('https://www.booking.com/city/fi/helsinki.en-gb.html?label=gen173nr-1BCAEoggI46AdIM1gEaEiIAQGYAQm4AQfIAQzYAQHoAQGIAgGoAgO4Aveuvv4FwAIB0gIkMWZkODFkYTYtY2M5Yy00N2E1LTlhNGItNmQ0YjZmZjkxYTFk2AIF4AIB;sid=d2a36dfc62f9e56716f35a50ec9c0d1d;breadcrumb=searchresults_irene;srpvid=76826ad4b0170334&')
    time.sleep(4)

    ## Input checkin date and search
    try:
      wait = WebDriverWait(self.driver, 5)
      elements = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "#frm > div.xp__fieldset.js--sb-fieldset.accommodation > div.xp__dates.xp__group > div.xp__dates-inner > div:nth-child(2) > div > div > div > div > div.sb-date-field__controls.sb-date-field__controls__ie-fix > div.sb-date-field__select.-month-year.js-date-field__part > select[class*='sb-date-field__select-field js-date-field__select'] option")))
      for option in elements:
        if(option.text == checkin_monthyear_input):
          option.click()
          break
    except:  
      print("Cannot search month")

    time.sleep(2)

    ## Choose checkin day
    try:
      wait = WebDriverWait(self.driver, 5)
      elements = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "#frm > div.xp__fieldset.js--sb-fieldset.accommodation > div.xp__dates.xp__group > div.xp__dates-inner > div:nth-child(2) > div > div > div > div > div.sb-date-field__controls.sb-date-field__controls__ie-fix > div.sb-date-field__select.-day.js-date-field__part > select[class*='sb-date-field__select-field js-date-field__select'] option")))
      for option in elements:
        if(option.text == checkin_date_input):
          option.click()
          break
    except:
      print("Cannot search day")
    
    time.sleep(2)

    ## Submit search form
    submit_button = self.driver.find_element_by_class_name("sb-searchbox__button")
    submit_button.click()

    time.sleep(3)

    ## Choose hotels filter
    try:
      wait = WebDriverWait(self.driver, 10)
      elements = wait.until(EC.presence_of_all_elements_located((By.PARTIAL_LINK_TEXT, "Hotels")))
      for option in elements:
        if(re.search(r'^[^\s]+\s\d+', option.text)):
          link = option.get_attribute("href")
          self.driver.get(link)
          break
    except:
      print("Cannot find filter")
    
    time.sleep(3)

    ## Find all url pages
    try:
      wait = WebDriverWait(self.driver, 10)
      container = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "bui-pagination__pages")))
      pages = container.find_elements_by_tag_name("a")
      for link in pages:
        self.page_urls.append(link.get_attribute("href"))
    except:
      print("Cannot find pagination")

    time.sleep(5)

    for url in self.page_urls:
      print('crawling Page 1, hang tight... ')
      ##selenium_response = self.get_selenium_response(url)
      yield Request(url, callback=self.parse_property, dont_filter=True)


  ## Find element and add to item loader
  def parse_property(self, response): 
    
    container = response.xpath("//div[@id='hotellist_inner']")
    hotel_containers = container.xpath(".//div[@class='sr_item  sr_item_new sr_item_default sr_property_block  sr_flex_layout           ']")
    for hotel_container in hotel_containers:
      i = ScraperItem()
      ## Find hotel name
      hotel_name = hotel_container.xpath(".//div[1]/div[1]/div[1]/h3/a/span[1]/text()").extract()[0].strip()
      i['hotel_name'] = hotel_name
      
      ## Find room type
      room_type = hotel_container.css("div.room_link span strong::text").extract()[0].strip()
      i['room_type'] = room_type
      
      ## Find room price
      room_original = hotel_container.xpath(".//div[@class='bui-price-display__value prco-inline-block-maker-helper ']/text()").extract()[0].strip()
      room_price = int(''.join(e for e in room_original if e.isalnum()))
      i['room_price'] = room_price

      yield i