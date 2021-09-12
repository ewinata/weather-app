import mysql.connector
import csv
import os

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database="locations"
)

mycursor = mydb.cursor()

#Transfer data from output.csv to locations database
#mycursor.execute("CREATE DATABASE locations")

#Create table
# mycursor.execute('''CREATE TABLE city_link
#     (
#         city_id INT NOT NULL AUTO_INCREMENT,
#         city_name VARCHAR(50) NOT NULL,
#         hourly_link TEXT NOT NULL,
#         daily_link TEXT NOT NULL,
#         tenday_link TEXT NOT NULL,
#         PRIMARY KEY (city_id)
#     )
# ''')

#Add data to table
# with open(os.path.dirname(os.path.realpath(__file__)) + '/output.csv', encoding="utf8") as csvfile:
#   reader = csv.reader(csvfile)
#   iter = 1
#   for row in reader:
#     if (len(row) != 4):
#       continue
#     if (iter%10 == 0):
#       print("Iteration number: {}".format(iter))
#     iter+=1
#     sqlStatement = '''INSERT INTO city_link
#       (city_name, hourly_link, daily_link, tenday_link)
#       VALUES
#       (
#         %s,
#         %s,
#         %s,
#         %s
#       )
#     '''
#     values = (row[0], row[1], row[2], row[3])
#     mycursor.execute(sqlStatement, values)
#   mydb.commit()
#   print("Done adding data to database...")