from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
import re

def windToDict(string):
    '''
        Converts scraped string for wind
        into a python dictionary
        speed is denoted in mph
        @return - dictionary that represents wind data
    '''
    tempData = string.split(' ')
    return { 'direction': tempData[0], 'speed': int(tempData[1]) }


def setDay(soup, returnDict):
    if "dayTemp" in returnDict.keys():
        return returnDict['dayTemp'][0] != -1
    day_temp = soup.find('span', attrs={'class': re.compile('^DetailsSummary--highTempValue--')}).string
    return day_temp != '--'

def getHighTemperature(soup, returnDict):
    ht = soup.find_all('span', attrs={'class': re.compile('^DetailsSummary--highTempValue--')})
    day_temp = []
    for temp in ht:
        if temp.string == '--':
            day_temp.append(-1)
        else:
            day_temp.append(int(temp.string.rstrip('\u00b0')))
    returnDict['dayTemp'] = day_temp

def getLowTemperature(soup, returnDict):
    lt = soup.find_all('span', attrs={'class': re.compile('^DetailsSummary--lowTempValue--')})
    night_temp = []
    for temp in lt:
        night_temp.append(int(temp.string.rstrip('\u00b0')))
    returnDict['nightTemp'] = night_temp

def getWeather(soup, returnDict, day):
    '''
        This represents an Enum of strings:
        partly cloudy
        cloudy
        mostly sunny 
        sunny
        mostly cloudy
        few showers
        showers
        rain
    '''
    wt = soup.find_all('svg', attrs={'set': 'weather', 'class': re.compile('.*DailyContent--weatherIcon--.*')})
    day_weather_status, night_weather_status = [], []
    if not day:
        day_weather_status.append('--')
    for i in range(len(wt)):
        if (not day):
            checkIndex = i+1
        else:
            checkIndex = i
        if (checkIndex % 2) == 0:
            day_weather_status.append(wt[i].find('title').text)
        else:
            night_weather_status.append(wt[i].find('title').text)

    
    returnDict['dayWeather'] = day_weather_status
    returnDict['nightWeather'] = night_weather_status


def getRainWind(soup, returnDict, day):
    containerDiv = soup.find_all('div', attrs={'class': re.compile('^DailyContent--dataPoints--.....$')})
    day_precipitation_percentage, night_precipitation_percentage = [], []
    day_winds, night_winds = [], []
    if not day:
        day_precipitation_percentage.append(-1)
        day_winds.append(windToDict('- -1 mph'))
    for i in range(len(containerDiv)):
        currentContainer = containerDiv[i]
        if not day:
            checkIndex = i+1
        else:
            checkIndex = i
        if checkIndex % 2 == 0:
            #Day container
            #Get data
            day_precipitation = currentContainer.find('span', attrs={'data-testid': 'PercentageValue'})
            if day_precipitation:
                day_precipitation_percentage.append(int(day_precipitation.text[0:-1]))
            else:
                day_precipitation_percentage.append(0)

            day_wind = currentContainer.find('span', attrs={'data-testid': 'Wind'})
            if day_wind:
                day_winds.append(windToDict(day_wind.text))
            else:
                day_winds.append(windToDict('- 0 mph'))
        else:
            #Night container
            night_precipitation = currentContainer.find('span', attrs={'data-testid': 'PercentageValue'})
            if night_precipitation:
                night_precipitation_percentage.append(int(night_precipitation.text[0:-1]))
            else:
                night_precipitation_percentage.append(0)
                
            night_wind = currentContainer.find('span', attrs={'data-testid': 'Wind'})
            if night_wind:
                night_winds.append(windToDict(night_wind.text))
            else:
                night_winds.append(windToDict('- 0 mph'))
    
    returnDict['dayWind'] = day_winds
    returnDict['nightWind'] = night_winds
    returnDict['dayPrecipitation'] = day_precipitation_percentage
    returnDict['nightPrecipitation'] = night_precipitation_percentage

def getHumidity(soup, returnDict, day):
    humSect = soup.find_all('li', attrs={'data-testid': 'HumiditySection'})
    dayHumidities, nightHumidities = [], []
    if not day:
        dayHumidities.append('--')
    for i in range(len(humSect)):
        if (not day):
            checkIndex = i+1
        else:
            checkIndex = i
        if checkIndex % 2 == 0:
            dayHumidities.append(humSect[i].find('span', attrs={'class': re.compile('^DetailsTable--value--.....$')}).text)
        else:
            nightHumidities.append(humSect[i].find('span', attrs={'class': re.compile('^DetailsTable--value--.....$')}).text)

    returnDict['dayHumidity'] = dayHumidities
    returnDict['nightHumidity'] = nightHumidities

def getSunriseTime(soup, returnDict, day):
    sunrise = []
    if not day:
        sunrise.append('--')
    sunriseSect = soup.find_all('span', attrs={'data-testid': 'SunriseTime' })
    for sunr in sunriseSect:
        sunrise.append(sunr.text)
    returnDict['sunriseTime'] = sunrise

def getSunsetTime(soup, returnDict, day):
    sunset = []
    if not day:
        sunset.append('--')
    sunsetSect = soup.find_all('span', attrs={'data-testid': 'SunsetTime' })
    for suns in sunsetSect:
        sunset.append(suns.text)
    returnDict['sunsetTime'] = sunset

def getMoonriseTime(soup, returnDict):
    moonrise = []
    moonriseSect = soup.find_all('span', attrs={'data-testid': 'MoonriseTime' })
    for moonr in moonriseSect:
        moonrise.append(moonr.text)
    returnDict['moonriseTime'] = moonrise
    

def getMoonsetTime(soup, returnDict):
    moonset = []
    moonsetSect = soup.find_all('span', attrs={'data-testid': 'MoonsetTime' })
    for moons in moonsetSect:
        moonset.append(moons.text)
    returnDict['moonsetTime'] = moonset


def getUvIndex(soup, returnDict, day):
    duv, nuv = [], []
    uvSect = soup.find_all('span', attrs={'data-testid': 'UVIndexValue'})
    if not day:
        duv.append('--')
    for i in range(len(uvSect)):
        if not day:
            checkIndex = i+1
        else:
            checkIndex = i
        if checkIndex % 2 == 0:
            duv.append(uvSect[i].text)
        else:
            nuv.append(uvSect[i].text)
    returnDict['dayUvIndex'] = duv
    returnDict['nightUvIndex'] = nuv

def get_10day(cityUrl):
    '''
        Gets daily weather data for 10 days
        @return - dictionary that is the response

        Sample response:
        {
            dayTemp:   Array,
            nightTemp:    Array,
            dayWind:       Array of dict
                        {
                            direction:  String,
                            speed:      int in mph,
                        }
            nightWind:     Array of dict
                        {
                            direction:  String,
                            speed:      int in mph,
                        }
            dayWeather:    Array,
            nightWeather:    Array,
            dayHumidity:    Array,
            nightHumidity:  Array,
            dayPrecipitation:  Array,   int in  %, -1 if NA
            nightPrecipitation: Array,  int in  %
            sunriseTime:    Array,
            sunsetTime:     Array,
            moonriseTime:   Array,
            moonsetTime:    Array,
            dayUvIndex:     Array,
            nightUvIndex:   Array,
        }
    '''
    print("Fetching Data...")
    returnDict = dict()
    req = Request(cityUrl, headers = {"User-Agent": "Mozilla/5.0"})
    weather_10day = urlopen(req)
    soup = BeautifulSoup(weather_10day, 'lxml')

    #Get day and night temperature
    getHighTemperature(soup, returnDict)
    getLowTemperature(soup, returnDict)
    

    #Checks if it is currently night time
    # If true then it is daytime
    day = setDay(soup, returnDict)
    
    
    #Get actual weather
    getWeather(soup, returnDict, day)
    
    #Get Chance of Rain and wind
    getRainWind(soup, returnDict, day)
    
    #Get day and night Humidity
    getHumidity(soup, returnDict, day)

    #Get sunrise and sunset time
    getSunriseTime(soup, returnDict, day)
    getSunsetTime(soup, returnDict, day)

    #Get moonrise and moonset time
    getMoonriseTime(soup, returnDict)
    getMoonsetTime(soup, returnDict)

    #Get uv index
    getUvIndex(soup, returnDict, day)

    print('Done Fetching Data...')
    return returnDict


'''
    This function is used for testing purposes
    run from command line
'''
if __name__ == "__main__":
    TEN_DAY_URL = "https://weather.com/weather/tenday/l/Tokyo+Tokyo+Prefecture+Japan?canonicalCityId=88531c440be4859e58ca9bee96a8fef95643429857e3c626542368c9cb3c4815"

    print(get_10day(TEN_DAY_URL))