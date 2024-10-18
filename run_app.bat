@echo off

Pushd "%~dp0"
call .venv/Scripts/activate.bat
start http://localhost:5000/
flask run --reload