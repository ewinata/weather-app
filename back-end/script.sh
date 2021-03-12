#!/usr/bin/env bash


if [ "$1" = "-setup" ] || [ "$1" = "setup" ] || [ "$1" = "-s" ] || [ "$1" = "s" ]
then
    #Run this code only after cloning from git
    #Delete env
    rm -r env
    echo "deleted previous env"
    #Create env
    python -m venv env
    echo "done creating new venv"
    source ./env/Scripts/activate
    python -m pip install --upgrade pip
    python -m pip install Flask
    python -m pip install flask-mysql
    python -m pip install beautifulsoup4
    python -m pip install lxml
    python -m pip install selenium
    python -m pip install http-request-randomizer
    deactivate
    echo "finished setting up new venv"
elif [ "$1" = "-run" ] || [ "$1" = "run" ] || [ "$1" = "-r" ] || [ "$1" = "r" ]
then
    #This command runs venv
    echo "running backend"
    source ./env/Scripts/activate
    python ./src/main.py
fi

read -p "Press enter to exit"


