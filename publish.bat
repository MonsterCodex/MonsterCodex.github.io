@echo off
title MonsterCodex Publisher

echo.
echo ==============================
echo   Publishing MonsterCodex...
echo ==============================
echo.

git add .

git diff --cached --quiet
if %errorlevel%==0 (
    echo No changes found.
    pause
    exit /b
)

git commit -m "Website Update"
git push

echo.
echo ==============================
echo   Published successfully!
echo ==============================
echo.

start https://monstercodex.com

pause