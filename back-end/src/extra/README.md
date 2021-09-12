# Extra Folder

This folder contains scripts that are run to generate the MySQL database that is connected to the Flask back end.

## Order of scripts:

1. locationHash.py

    This script is used to scrape links for different cities available in **worldcities.csv** and stores the data in
    **output.csv**, the scraping has flaws so a list of cities with failed attempts at scraping is available in
    **NotAvailable.txt**.

2. database_creator.py

    This script is used to move the data within **output.csv** to the MySQL database