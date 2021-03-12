from bs4 import BeautifulSoup
from urllib.request import Request, urlopen

#Globals/URLs (SANTA MONICA)
WEATHER_HOURLY = "https://weather.com/weather/hourbyhour/l/fc1d71a22bba05b36dfe413a19b2573a1574d647d13e533f735add07e05f6bf7"
WEATHER_TODAY = "https://weather.com/weather/today/l/fc1d71a22bba05b36dfe413a19b2573a1574d647d13e533f735add07e05f6bf7"
WEATHER_10DAY = "https://weather.com/weather/tenday/l/fc1d71a22bba05b36dfe413a19b2573a1574d647d13e533f735add07e05f6bf7"


#Function scrapers
def get_hourly():
    req = Request(WEATHER_HOURLY, headers = {"User-Agent": "Mozilla/5.0"})
    weather_hourly = urlopen(req)
    soup = BeautifulSoup(weather_hourly, 'lxml')


def get_today():
    req = Request(WEATHER_TODAY, headers = {"User-Agent": "Mozilla/5.0"})
    weather_today = urlopen(req)
    soup = BeautifulSoup(weather_today, 'lxml')


def get_10day():
    req = Request(WEATHER_10DAY, headers = {"User-Agent": "Mozilla/5.0"})
    weather_10day = urlopen(req)
    soup = BeautifulSoup(weather_10day, 'lxml')
    #Get high and low temperature
    ht = soup.find_all('span', attrs={'class':'DetailsSummary--highTempValue--3x6cL'})
    lt = soup.find_all('span', attrs={'class':'DetailsSummary--lowTempValue--1DlJK'})
    high_temp, low_temp = [], []
    for temp in ht:
        high_temp.append(temp.string)
    for temp in lt:
        low_temp.append(temp.string)
    #Get Weather
    wt = soup.find_all('span', attrs={'class':'DetailsSummary--extendedData--aaFeV'})
    weather_status = []
    for weather in wt:
        weather_status.append(weather.string)
    #Get Chance of Rain
    pre = soup.find_all('span', attrs={'class':'Wind--windWrapper--1Va1P undefined'})
    #Get Wind
    wind = soup.find_all('span', attrs={'class':'Wind--windWrapper--1Va1P undefined'})
    winds = []
    for w in wind:
        winds.append(w.getText())
    #Get Humidity

#Test
if __name__ == '__main__':
    get_10day()