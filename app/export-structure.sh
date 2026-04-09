#!/bin/bash

# Export Table Structure Script
# This script exports table structure from MySQL database

set -e

echo "============================================="
echo "   Table Structure Export Tool"
echo "============================================="
echo ""

# Configuration
DB_HOST="localhost:3307"
DB_USER="root"
DB_PASS="root"
DB_NAME="h5cr_main"
OUTPUT_DIR="./exports"

# Create exports directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Function to export structure only
export_structure() {
    echo "Exporting table structure..."
    docker-compose exec -T db mysqldump -u$DB_USER -p$DB_PASS --no-data $DB_NAME > "$OUTPUT_DIR/export-structure-$(date +%Y%m%d_%H%M%S).sql"
    echo "✓ Structure exported to $OUTPUT_DIR/"
}

# Function to export structure + data
export_full() {
    echo "Exporting full database (structure + data)..."
    docker-compose exec -T db mysqldump -u$DB_USER -p$DB_PASS $DB_NAME > "$OUTPUT_DIR/export-full-$(date +%Y%m%d_%H%M%S).sql"
    echo "✓ Full export saved to $OUTPUT_DIR/"
}

# Function to export specific table
export_table() {
    read -p "Enter table name: " TABLE_NAME
    echo "Exporting table: $TABLE_NAME"
    docker-compose exec -T db mysqldump -u$DB_USER -p$DB_PASS $DB_NAME $TABLE_NAME > "$OUTPUT_DIR/export-$TABLE_NAME-$(date +%Y%m%d_%H%M%S).sql"
    echo "✓ Table exported to $OUTPUT_DIR/"
}

# Function to export all tables separately
export_all_separate() {
    echo "Exporting all tables separately..."
    tables=$(docker-compose exec -T db mysql -u$DB_USER -p$DB_PASS -e "SHOW TABLES;" $DB_NAME | tail -n +2)
    
    for table in $tables; do
        if [ ! -z "$table" ]; then
            echo "  Exporting: $table"
            docker-compose exec -T db mysqldump -u$DB_USER -p$DB_PASS --no-data $DB_NAME $table > "$OUTPUT_DIR/export-$table-structure.sql"
        fi
    done
    echo "✓ All tables exported to $OUTPUT_DIR/"
}

# Function to show database info
show_info() {
    echo ""
    echo "Database Information:"
    echo "=================="
    docker-compose exec db mysql -u$DB_USER -p$DB_PASS -e "SELECT DATABASE() as current_database;" 2>/dev/null
    echo ""
    echo "Tables:"
    docker-compose exec db mysql -u$DB_USER -p$DB_PASS -e "SHOW TABLES;" $DB_NAME 2>/dev/null
    echo ""
}

# Menu
while true; do
    echo ""
    echo "Choose an option:"
    echo "1. Export structure only (no data)"
    echo "2. Export full database (structure + data)"
    echo "3. Export specific table"
    echo "4. Export all tables separately"
    echo "5. Show database information"
    echo "6. View export files"
    echo "0. Exit"
    echo ""
    read -p "Enter your choice (0-6): " choice

    case $choice in
        1)
            export_structure
            ;;
        2)
            export_full
            ;;
        3)
            export_table
            ;;
        4)
            export_all_separate
            ;;
        5)
            show_info
            ;;
        6)
            echo ""
            echo "Export files in $OUTPUT_DIR/:"
            ls -lh "$OUTPUT_DIR/"
            ;;
        0)
            echo "Goodbye!"
            exit 0
            ;;
        *)
            echo "Invalid choice. Please try again."
            ;;
    esac
done
