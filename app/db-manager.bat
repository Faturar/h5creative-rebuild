@echo off
REM Live Booking Database Management Script for Windows
REM This script provides easy commands for database operations with Docker

setlocal enabledelayedexpansion

:menu
cls
echo =============================================
echo    Live Booking Database Management
echo =============================================
echo 1. Start Database Services
echo 2. Stop Database Services
echo 3. Restart Database Services
echo 4. Reset Database (Delete All Data)
echo 5. Import Sample Data
echo 6. Run Prisma Migrations
echo 7. Open Prisma Studio
echo 8. Open phpMyAdmin
echo 9. View Database Logs
echo 10. Backup Database
echo 11. Restore Database
echo 12. Check Database Status
echo 0. Exit
echo =============================================
echo.
set /p choice="Enter your choice (0-12): "

if "%choice%"=="1" goto start_services
if "%choice%"=="2" goto stop_services
if "%choice%"=="3" goto restart_services
if "%choice%"=="4" goto reset_database
if "%choice%"=="5" goto import_data
if "%choice%"=="6" goto run_migrations
if "%choice%"=="7" goto open_studio
if "%choice%"=="8" goto open_phpmyadmin
if "%choice%"=="9" goto view_logs
if "%choice%"=="10" goto backup_db
if "%choice%"=="11" goto restore_db
if "%choice%"=="12" goto check_status
if "%choice%"=="0" goto exit_script
goto invalid_choice

:start_services
echo [INFO] Starting database services...
docker-compose up -d
if %errorlevel% equ 0 (
    echo [INFO] Services started successfully!
    echo [INFO] phpMyAdmin: http://localhost:8080
) else (
    echo [ERROR] Failed to start services
)
goto pause_and_continue

:stop_services
echo [INFO] Stopping database services...
docker-compose stop
if %errorlevel% equ 0 (
    echo [INFO] Services stopped successfully!
) else (
    echo [ERROR] Failed to stop services
)
goto pause_and_continue

:restart_services
echo [INFO] Restarting database services...
docker-compose restart
if %errorlevel% equ 0 (
    echo [INFO] Services restarted successfully!
) else (
    echo [ERROR] Failed to restart services
)
goto pause_and_continue

:reset_database
echo [WARNING] This will delete all data. Are you sure? (y/n)
set /p confirm=
if /i "%confirm%"=="y" (
    echo [INFO] Resetting database...
    docker-compose down -v
    docker-compose up -d
    echo [INFO] Database reset successfully!
    echo [INFO] Please run Prisma migrations: npm run prisma:migrate
) else (
    echo [INFO] Operation cancelled.
)
goto pause_and_continue

:import_data
echo [INFO] Importing sample data...
docker-compose exec -T db mysql -uroot -proot live_booking ^< import-data.sql
if %errorlevel% equ 0 (
    echo [INFO] Sample data imported successfully!
) else (
    echo [ERROR] Failed to import sample data
)
goto pause_and_continue

:run_migrations
echo [INFO] Running Prisma migrations...
call npm run prisma:migrate
if %errorlevel% equ 0 (
    echo [INFO] Migrations completed successfully!
) else (
    echo [ERROR] Failed to run migrations
)
goto pause_and_continue

:open_studio
echo [INFO] Opening Prisma Studio...
call npm run prisma:studio
goto pause_and_continue

:open_phpmyadmin
echo [INFO] Opening phpMyAdmin...
echo [INFO] URL: http://localhost:8080
start http://localhost:8080
goto pause_and_continue

:view_logs
echo [INFO] Showing database logs (Ctrl+C to exit)...
docker-compose logs -f db
goto pause_and_continue

:backup_db
echo [INFO] Creating database backup...
set backup_file=backup_%date:~10,4%%date:~4,2%%date:~7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.sql
set backup_file=%backup_file: =0%
docker-compose exec db mysqldump -uroot -proot live_booking ^> !backup_file!
if %errorlevel% equ 0 (
    echo [INFO] Backup created: !backup_file!
) else (
    echo [ERROR] Failed to create backup
)
goto pause_and_continue

:restore_db
echo [WARNING] This will replace current database data.
echo [INFO] Enter backup file name:
set /p backup_file=
if exist "%backup_file%" (
    echo [INFO] Restoring database from %backup_file%...
    docker-compose exec -T db mysql -uroot -proot live_booking ^< %backup_file%
    if %errorlevel% equ 0 (
        echo [INFO] Database restored successfully!
    ) else (
        echo [ERROR] Failed to restore database
    )
) else (
    echo [ERROR] Backup file not found: %backup_file%
)
goto pause_and_continue

:check_status
echo [INFO] Database Status:
docker-compose ps
echo.
echo [INFO] Database Connection:
docker-compose exec db mysql -uroot -proot -e "SELECT 'Connected' as status, NOW() as current_time;" 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Cannot connect to database
)
goto pause_and_continue

:invalid_choice
echo [ERROR] Invalid choice. Please try again.
goto pause_and_continue

:pause_and_continue
echo.
pause
goto menu

:exit_script
echo [INFO] Goodbye!
exit /b 0
