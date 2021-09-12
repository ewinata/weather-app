from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
import re

#Function scrapers
def get_hourly(cityUrl):
    req = Request(cityUrl, headers = {"User-Agent": "Mozilla/5.0"})
    weather_hourly = urlopen(req)
    soup = BeautifulSoup(weather_hourly, 'lxml')


def get_today(cityUrl):
    req = Request(cityUrl, headers = {"User-Agent": "Mozilla/5.0"})
    weather_today = urlopen(req)
    soup = BeautifulSoup(weather_today, 'lxml')



def get_10day(cityUrl):
    '''
        Gets daily weather data for 10 days
        @return - dictionary that is the response
    '''
    returnDict = dict()
    req = Request(cityUrl, headers = {"User-Agent": "Mozilla/5.0"})
    weather_10day = urlopen(req)
    soup = BeautifulSoup(weather_10day, 'lxml')

    #Get high and low temperature
    ht = soup.find_all('span', attrs={'class': re.compile('^DetailsSummary--highTempValue--')})
    lt = soup.find_all('span', attrs={'class': re.compile('^DetailsSummary--lowTempValue--')})
    high_temp, low_temp = [], []
    for temp in ht:
        high_temp.append(temp.string)
    for temp in lt:
        low_temp.append(temp.string)

    #Get Weather
    wt = soup.find_all('span', attrs={'class':re.compile('^DetailsSummary--extendedData--.....$')})
    weather_status = []
    for weather in wt:
        weather_status.append(weather.string)

    #Get Chance of Rain
    preDiv = soup.find_all('div', attrs={'class': re.compile('^DetailsSummary--precip--.....$')})
    precipitation_percentage = []
    for div in preDiv:
        tempSoup = BeautifulSoup(div, 'lxml')
        precipitation_percentage.append(tempSoup.find('span').string)

    #Get Wind
    wind = soup.find_all('span', attrs={'class': re.compile('^Wind--windWrapper--..... undefined$')})
    winds = []
    for w in wind:
        winds.append(w.text)
    
    #Get Humidity
    humSect = soup.find_all('li', attrs={'data-testid': 'HumiditySection'})
    humidities = []
    for h in humSect:
        tempSoup = BeautifulSoup(h, 'lxml')
        hum = tempSoup.find('span', attrs={'class': re.compile('^DetailsTable--value--.....$')}).text
        humidities.append(hum)

    returnDict['highTemp'] = high_temp
    returnDict['lowTemp'] = low_temp
    returnDict['wind'] = winds
    returnDict['weather'] = weather_status
    returnDict['precipitation'] = precipitation_percentage
    return returnDict


# Used for testing:
if __name__ == "__main__":
    HOURLY_URL = "https://weather.com/weather/hourbyhour/l/Tokyo+Tokyo+Prefecture+Japan?canonicalCityId=88531c440be4859e58ca9bee96a8fef95643429857e3c626542368c9cb3c4815"
    TODAY_URL = "https://weather.com/weather/today/l/Tokyo+Tokyo+Prefecture+Japan?canonicalCityId=88531c440be4859e58ca9bee96a8fef95643429857e3c626542368c9cb3c4815"
    TEN_DAY_URL = "https://weather.com/weather/tenday/l/Tokyo+Tokyo+Prefecture+Japan?canonicalCityId=88531c440be4859e58ca9bee96a8fef95643429857e3c626542368c9cb3c4815"

    print(get_10day(TEN_DAY_URL))
    print(get_hourly(HOURLY_URL))
    print(get_today(TODAY_URL))