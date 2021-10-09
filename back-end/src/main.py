from flask import Flask, request, abort
from flaskext.mysql import MySQL
from flask_restful import Resource, Api
from flask_cors import CORS
from marshmallow import Schema, fields
from urllib.parse import unquote
from enum import Enum
# Scraper scripts
from scraper.scrapehourly import get_hourly
from scraper.scrapedaily import get_10day

#Flask init
app = Flask(__name__)
cors = CORS(app, resources={r"/weather/*": {"origins": "*"}})

#MySQL init
mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'locations'
app.config['MYSQL_DATABASE_HOST'] = 'localhost' #default
app.config['MYSQL_DATABASE_PORT'] = 3306
#app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql.init_app(app)


'''
    Flask REST API Resources
'''
api = Api(app)

class WeatherSchema(Schema):
    table = fields.Str(required=True, error_messages={"required": "Table is required."})


weather_schema = WeatherSchema()

class WeatherAPI(Resource):
    '''
        GET method
    '''
    def get(self, cityname):
        # Check if fields are in correct format
        errors = weather_schema.validate(request.args)
        if errors:
            abort(400, str(errors))
        table = request.args['table']
        table_name = None
        if (table == 'daily'):
            table_name = TableName.Tenday
        elif (table == 'hourly'):
            table_name = TableName.Hourly
        else:
            abort(400, "Table field unavailable, try `daily` or `hourly`")

        # Get URL from database and return data
        return getCityData(cityname, table_name)
    
api.add_resource(WeatherAPI, '/weather/<cityname>/')

'''
    This function is used to check if a city name is valid
    and return the url
    @return
        False: if cityname is not in database
        cityUrl: if cityname exists, then we return the url associated
'''
#ENUM
class TableName(Enum):
    Hourly = 0
    Tenday = 1
#FUNCTION
def getCityData(cityname, tablename):
    cur = mysql.connect().cursor()
    #Check which table to query from
    if (tablename == TableName.Hourly):
        cur.execute("SELECT hourly_link FROM city_link WHERE city_name = %s", (cityname,))
    elif (tablename == TableName.Tenday):
        cur.execute("SELECT tenday_link FROM city_link WHERE city_name = %s", (cityname,))
    result = cur.fetchone()
    # Return None if no result
    if not result:
        return None, 404
    # Return the dictionary associated with the Scrape from URL
    if (tablename == TableName.Hourly):
        return get_hourly(result[0]), 200
    elif (tablename == TableName.Tenday):
        return get_10day(result[0]), 200
    return None, 400

@app.route('/')
def main():
    return "<h1>Weather App Backend root<h1>"

#Main function
if __name__ == '__main__':
    app.run(debug=True)