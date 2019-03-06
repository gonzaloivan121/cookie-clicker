@echo off
git add . --all
set /p id="Commit message: "
echo[
git commit -am "%id%"
git push heroku master
echo[
echo Your app has been deployed.
PAUSE