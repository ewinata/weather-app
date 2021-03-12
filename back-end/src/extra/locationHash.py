import csv
import os
import time
from selenium import webdriver
# from selenium.webdriver.common.keys import Keys
# from selenium.common.exceptions import TimeoutException
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from selenium.webdriver.common.by import By
# from selenium.webdriver.common.action_chains import ActionChains 
from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
from http_request_randomizer.requests.proxy.requestProxy import RequestProxy



#This code just aims to store all hash values resulting from different zip codes / locations
#From www.weather.com



def generateCitySet():
    ''' 
        Generates a list of cities in ascii, data taken from worldcities.csv
    '''
    CITY_LIST = []
    with open(os.path.dirname(os.path.realpath(__file__)) + '/worldcities.csv', encoding="utf8") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            CITY_LIST.append(row['city_ascii'])
    return CITY_LIST

def generateLocationHash(CITY_LIST):
    '''
        Generates a dictionary of Hash to enter into the URL for www.weather.com
    '''
    chromedriver_loc = os.path.dirname(os.path.realpath(__file__)) + '/chromedriver.exe'
    options = webdriver.ChromeOptions()
    options.add_argument('--ignore-certificate-errors')
    options.add_argument('--ignore-ssl-errors')
    driver = webdriver.Chrome(executable_path=chromedriver_loc, chrome_options=options)
    # driver.get('https://weather.com/')
    # action = ActionChains(driver) 
    # req_proxy = RequestProxy() #you may get different number of proxy when  you run this at each time
    # proxies = req_proxy.get_proxy_list() #this will create proxy list
    # options.add_argument('--proxy-server={}'.format(proxies[0].get_address))
    LOCATION_DICT = {}
    MISSING_SET = set()
    # i = 0
    iterator = 1
    # print(len(CITY_LIST))
    for city in CITY_LIST:
        #Gets the URL for the city
        #Dict format:
        #   key: value
        #   city_ascii: [ hourly_url, today_url, ten_day_url ]
        hourly_url, today_url, ten_day_url = 'https://weather.com/weather/hourbyhour/l/', 'https://weather.com/weather/today/l/', 'https://weather.com/weather/tenday/l/'
        #Get Hash
        timeout = 5
        loc_hash = ''
        # WebDriverWait(driver, timeout).until(EC.presence_of_element_located((By.ID, 'LocationSearch_input')))
        # inputElement = driver.find_element_by_id('LocationSearch_input')
        # action.move_to_element(inputElement).click().perform()
        # action.move_to_element(inputElement).send_keys(city,Keys.RETURN).perform()
        # inputElement.send_keys(Keys.ENTER)
        searchString = 'www.weather.com+' + city.replace(' ','+')
        driver.get("https://www.bing.com/search?q=" + searchString)
        # result = driver.find_elements_by_xpath('//div[@class="r"]/a/h3')  # finds webresults
        # result[0].click() # clicks the first one

        # req = Request("https://www.google.com/search?q=" + searchString, headers = {"User-Agent": "Mozilla/5.0"})
        # result = urlopen(req)
        # soup = BeautifulSoup(result, 'lxml')
        weather_url = ''
        soup = BeautifulSoup(driver.page_source, 'lxml')
        for div in soup.find_all('li', attrs={'class':'b_algo'}):
            for a in div.find_all('a'):
                if a and ("https://weather.com" in a['href']):
                    weather_url = a['href']
                    break
            break
        
        #print(weather_url)
        currentUrl = weather_url.split('/')
        loc_hash = currentUrl[-1]
        #print(loc_hash)

        if not loc_hash:
            MISSING_SET.add(city)
            # driver.quit()
            # # i+=1
            # chromedriver_loc = os.path.dirname(os.path.realpath(__file__)) + '/chromedriver.exe'
            # options = webdriver.ChromeOptions()
            # options.add_argument('--ignore-certificate-errors')
            # options.add_argument('--ignore-ssl-errors')
            # # options.add_argument('--proxy-server={}'.format(proxies[i].get_address))
            # driver = webdriver.Chrome(executable_path=chromedriver_loc, chrome_options=options)
            continue

        LOCATION_DICT[city] = [hourly_url + loc_hash, today_url + loc_hash, ten_day_url + loc_hash]
        if iterator%20==0:
            print('Currently done with iteration number: ' + str(iterator))
        iterator+=1

    driver.quit()
    return LOCATION_DICT, MISSING_SET

def storeLocationHash(LOCATION_DICT):
    '''
        Stores the LOCATION_DICT into a csv file- locationhash.csv
    '''
    w = csv.writer(open(os.path.dirname(os.path.realpath(__file__)) + "/output.csv", "w", encoding="utf8"))
    for key, val in LOCATION_DICT.items():
        w.writerow([key, val[0], val[1], val[2]])

def outPutMissingValues(MISSING_SET):
    f = open('NotAvailable.txt', "w", encoding="utf8")
    for val in MISSING_SET:
        f.write(val + '\n')
    f.close()

if __name__ == '__main__':
    CITY_LIST = generateCitySet()
    print('Done generating city list')
    LOCATION_DICT, MISSING_SET = generateLocationHash(CITY_LIST)
    print('Done generating location hash')
    storeLocationHash(LOCATION_DICT)
    print('Done storing location hash into csv')
    outPutMissingValues(MISSING_SET)
