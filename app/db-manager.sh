#!/bin/bash

# Live Booking Database Management Script
# This script provides easy commands for database operations with Docker

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
}

# Function to show menu
show_menu() {
    echo ""
    echo "============================================="
    echo "   Live Booking Database Management"
    echo "============================================="
    echo "1. Start Database Services"
    echo "2. Stop Database Services"
    echo "3. Restart Database Services"
    echo "4. Reset Database (Delete All Data)"
    echo "5. Import Sample Data"
    echo "6. Run Prisma Migrations"
    echo "7. Open Prisma Studio"
    echo "8. Open phpMyAdmin"
    echo "9. View Database Logs"
    echo "10. Backup Database"
    echo "11. Restore Database"
    echo "12. Check Database Status"
    echo "0. Exit"
    echo "============================================="
}

# Function to start services
start_services() {
    check_docker
    print_status "Starting database services..."
    docker-compose up -d
    print_status "Services started successfully!"
    print_status "phpMyAdmin: http://localhost:8080"
}

# Function to stop services
stop_services() {
    print_status "Stopping database services..."
    docker-compose stop
    print_status "Services stopped successfully!"
}

# Function to restart services
restart_services() {
    check_docker
    print_status "Restarting database services..."
    docker-compose restart
    print_status "Services restarted successfully!"
}

# Function to reset database
reset_database() {
    print_warning "This will delete all data. Are you sure? (y/n)"
    read -r confirm
    if [ "$confirm" = "y" ]; then
        print_status "Resetting database..."
        docker-compose down -v
        docker-compose up -d
        print_status "Database reset successfully!"
        print_status "Please run Prisma migrations: npm run prisma:migrate"
    else
        print_status "Operation cancelled."
    fi
}

# Function to import sample data
import_sample_data() {
    check_docker
    print_status "Importing sample data..."
    docker-compose exec -T db mysql -uroot -proot live_booking < import-data.sql
    print_status "Sample data imported successfully!"
}

# Function to run Prisma migrations
run_migrations() {
    print_status "Running Prisma migrations..."
    npm run prisma:migrate
    print_status "Migrations completed successfully!"
}

# Function to open Prisma Studio
open_prisma_studio() {
    print_status "Opening Prisma Studio..."
    npm run prisma:studio
}

# Function to open phpMyAdmin
open_phpmyadmin() {
    print_status "Opening phpMyAdmin..."
    print_status "URL: http://localhost:8080"
    if command -v xdg-open > /dev/null; then
        xdg-open http://localhost:8080
    elif command -v open > /dev/null; then
        open http://localhost:8080
    else
        print_warning "Please open http://localhost:8080 in your browser"
    fi
}

# Function to view logs
view_logs() {
    print_status "Showing database logs (Ctrl+C to exit)..."
    docker-compose logs -f db
}

# Function to backup database
backup_database() {
    print_status "Creating database backup..."
    backup_file="backup_$(date +%Y%m%d_%H%M%S).sql"
    docker-compose exec db mysqldump -uroot -proot live_booking > "$backup_file"
    print_status "Backup created: $backup_file"
}

# Function to restore database
restore_database() {
    print_warning "This will replace current database data."
    print_status "Enter backup file name:"
    read -r backup_file
    if [ -f "$backup_file" ]; then
        print_status "Restoring database from $backup_file..."
        docker-compose exec -T db mysql -uroot -proot live_booking < "$backup_file"
        print_status "Database restored successfully!"
    else
        print_error "Backup file not found: $backup_file"
    fi
}

# Function to check status
check_status() {
    print_status "Database Status:"
    docker-compose ps
    echo ""
    print_status "Database Connection:"
    docker-compose exec db mysql -uroot -proot -e "SELECT 'Connected' as status, NOW() as current_time;" 2>/dev/null || print_error "Cannot connect to database"
}

# Main menu loop
while true; do
    show_menu
    echo ""
    echo "Enter your choice (0-12):"
    read -r choice

    case $choice in
        1) start_services ;;
        2) stop_services ;;
        3) restart_services ;;
        4) reset_database ;;
        5) import_sample_data ;;
        6) run_migrations ;;
        7) open_prisma_studio ;;
        8) open_phpmyadmin ;;
        9) view_logs ;;
        10) backup_database ;;
        11) restore_database ;;
        12) check_status ;;
        0) 
            print_status "Goodbye!"
            exit 0
            ;;
        *) 
            print_error "Invalid choice. Please try again."
            ;;
    esac

    echo ""
    read -p "Press Enter to continue..."
done
