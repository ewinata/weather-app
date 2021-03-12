from flask import Flask
from flaskext.mysql import MySQL

#Flask init
app = Flask(__name__)

#MySQL init
mysql = MySQL(app)
#or add: mysql.init_app(app)
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'weatherdata'
app.config['MYSQL_DATABASE_HOST'] = 'localhost' #default
app.config['MYSQL_DATABASE_PORT'] = '7000'

@app.route('/')
def hello_world():
    return 'Hello, World!'

#Main function
if __name__ == '__main__':
    app.run(debug=True)