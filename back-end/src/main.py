from flask import Flask
from flaskext.mysql import MySQL
from scrape import *

#Flask init
app = Flask(__name__)

#MySQL init
mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'locations'
app.config['MYSQL_DATABASE_HOST'] = 'localhost' #default
app.config['MYSQL_DATABASE_PORT'] = 3306
#app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql.init_app(app)

@app.route('/hourly/<string:cityname>', methods=['GET'])
def hourly(cityname):
    #get URL
    cityname = cityname.replace("%20", " ")
    cur = mysql.connect().cursor()
    cur.execute("SELECT hourly_link FROM city_link WHERE city_name = %s", (cityname,))
    cityUrl = cur.fetchone()[0]
    #print(cityUrl)
    return get_hourly(cityUrl)

@app.route('/daily/<string:cityname>', methods=['GET'])
def daily(cityname):
    #get URL
    cityname = cityname.replace("%20", " ")
    cur = mysql.connect().cursor()
    cur.execute("SELECT tenday_link FROM city_link WHERE city_name = %s", cityname)
    cityUrl = cur.fetchone()[0]
    #print(cityUrl)
    return get_10day(cityUrl)

@app.route('/today/<string:cityname>', methods=['GET'])
def today(cityname):
    #get URL
    cityname = cityname.replace("%20", " ")
    cur = mysql.connect().cursor()
    cur.execute("SELECT daily_link FROM cities WHERE city_name = %s", (cityname,))
    cityUrl = cur.fetchone()[0]
    #print(cityUrl)
    return get_today(cityUrl)

@app.route('/')
def test():
    return "Weather App Backend root"

#Main function
if __name__ == '__main__':
    app.run(debug=True)