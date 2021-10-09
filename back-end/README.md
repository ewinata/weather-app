# Instructions to setup/run backend

**If your system has bash installed**: 
1. Run shell.sh
2. Arguments:
    Setup: s, -s, setup, -setup
    Run: r, -r, run, -run

**If not, then run the following commands from root of backend**:

Setup environment:
1. python -m venv env
2. ./env/Scripts/activate
3. python -m pip install --upgrade pip
4. python -m pip install Flask
5. python -m pip install flask-mysql
6. python -m pip install beautifulsoup4
7. python -m pip install lxml
8. python -m pip install selenium
9. python -m pip install http-request-randomizer
10. python -m pip install flask-restful
11. python -m pip install -U marshmallow
12. python -m pip install -U flask-cors


Run environment:
1. ./env/Scripts/activate
2. python ./src/main.py

To end venv:
1. deactivate

### Notes for Windows:
Sometimes powershell doesn't allow you to run scripts to activate the venv
To allow scripts for venv activation, run the following command before activating venv:
- Set-ExecutionPolicy Unrestricted -Scope Process