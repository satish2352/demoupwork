@echo off
REM Change directory to Angular project and run it
cd /d D:\upwork\upwork\SoftDevApp\ContactManagementApp\frontupdated\front
start cmd /k "ng serve"

REM Change directory to Laravel project and run it \
cd /d D:\upwork\upwork\SoftDevApp\ContactManagementApp\frontupdated\front\contactapiclient
start cmd /k "php artisan serve"

pause
