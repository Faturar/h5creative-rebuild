@echo off
setlocal enabledelayedexpansion

REM Export Table Structure Script for Windows
REM This script exports table structure from MySQL database

:menu
cls
echo =============================================
echo    Table Structure Export Tool
echo =============================================
echo.
echo 1. Export structure only (no data)
echo 2. Export full database (structure + data)
echo 3. Export specific table
echo 4. Export all tables separately
echo 5. Show database information
echo 6. View export files
echo 0. Exit
echo =============================================
echo.
set /p choice="Enter your choice (0-6): "

if "%choice%"=="1" goto export_structure
if "%choice%"=="2" goto export_full
if "%choice%"=="3" goto export_table
if "%choice%"=="4" goto export_all
if "%choice%"=="5" goto show_info
if "%choice%"=="6" goto view_files
if "%choice%"=="0" goto exit_script
goto invalid_choice

:export_structure
echo.
echo Exporting table structure...
set filename=export-structure-%date:~10,4%%date:~4,2%%date:~7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.sql
set filename=%filename: =0%
if not exist exports mkdir exports
docker-compose exec -T db mysqldump -uroot -proot --no-data h5cr_main > exports/%filename%
if %errorlevel% equ 0 (
    echo [SUCCESS] Structure exported to exports/%filename%
) else (
    echo [ERROR] Failed to export structure
)
goto pause_and_continue

:export_full
echo.
echo Exporting full database (structure + data)...
set filename=export-full-%date:~10,4%%date:~4,2%%date:~7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.sql
set filename=%filename: =0%
if not exist exports mkdir exports
docker-compose exec -T db mysqldump -uroot -proot h5cr_main > exports/%filename%
if %errorlevel% equ 0 (
    echo [SUCCESS] Full export saved to exports/%filename%
) else (
    echo [ERROR] Failed to export database
)
goto pause_and_continue

:export_table
echo.
set /p table="Enter table name: "
echo Exporting table: %table%
set filename=export-%table%-%date:~10,4%%date:~4,2%%date:~7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.sql
set filename=%filename: =0%
if not exist exports mkdir exports
docker-compose exec -T db mysqldump -uroot -proot h5cr_main %table% > exports/%filename%
if %errorlevel% equ 0 (
    echo [SUCCESS] Table exported to exports/%filename%
) else (
    echo [ERROR] Failed to export table
)
goto pause_and_continue

:export_all
echo.
echo Exporting all tables separately...
if not exist exports mkdir exports
echo Fetching table list...
docker-compose exec -T db mysql -uroot -proot -e "SHOW TABLES;" h5cr_main > temp_tables.txt 2>nul
for /f "skip=1 tokens=*" %%t in (temp_tables.txt) do (
    echo   Exporting: %%t
    docker-compose exec -T db mysqldump -uroot -proot --no-data h5cr_main %%t > exports/export-%%t-structure.sql 2>nul
)
del temp_tables.txt
echo [SUCCESS] All tables exported to exports/
goto pause_and_continue

:show_info
echo.
echo Database Information:
echo ==================
echo Current Database: h5cr_main
echo.
echo Tables:
docker-compose exec db mysql -uroot -proot -e "SHOW TABLES;" h5cr_main 2>nul
echo.
goto pause_and_continue

:view_files
echo.
echo Export files in exports/:
if exist exports (
    dir exports /b
) else (
    echo No export files found.
)
echo.
goto pause_and_continue

:invalid_choice
echo.
echo [ERROR] Invalid choice. Please try again.
goto pause_and_continue

:pause_and_continue
echo.
pause
goto menu

:exit_script
echo.
echo Goodbye!
exit /b 0
