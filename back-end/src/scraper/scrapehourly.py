from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
import re


def get_hourly(cityUrl):
    '''
        Gets hourly weather data starting from current time
        @return - dictionary that is the response
        
        Sample response:
        {
            temp:   Array,
            wind:       {
                            direction:  String,
                            speed:      int in mph,
                        }
            weather:    Array,
            precipitation:  Array
        }
    '''
    req = Request(cityUrl, headers = {"User-Agent": "Mozilla/5.0"})
    weather_hourly = urlopen(req)
    soup = BeautifulSoup(weather_hourly, 'lxml')
    
    # Get high and low temperature

    # Get temperature

    # Get actual weather
    #   partly cloudy
    #   cloudy
    #   mostly sunny
    #   sunny
    #   mostly cloudy
    #   few showers

    # Get chance of rain

    # Get wind

    # Get humidity

'''
    This function is used for testing purposes
    run from command line
'''
if __name__ == "__main__":
    HOURLY_URL = "https://weather.com/weather/hourbyhour/l/Tokyo+Tokyo+Prefecture+Japan?canonicalCityId=88531c440be4859e58ca9bee96a8fef95643429857e3c626542368c9cb3c4815"
    print(get_hourly(HOURLY_URL))