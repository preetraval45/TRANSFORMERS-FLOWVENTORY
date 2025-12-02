#!/bin/bash
# Script to migrate local database to server database

echo "========================================="
echo "Flowventory Database Migration Script"
echo "========================================="
echo ""

# Check if backup exists
if [ ! -f "flowventory_backup.sql" ]; then
    echo "Error: flowventory_backup.sql not found!"
    echo "Run this first:"
    echo "docker exec flowventory-db pg_dump -U postgres flowventory > flowventory_backup.sql"
    exit 1
fi

echo "Backup file found: flowventory_backup.sql"
echo ""

# Get server database URL from user
echo "Enter your server database details:"
read -p "Server IP/Hostname: " SERVER_HOST
read -p "Database Port (default 5432): " DB_PORT
DB_PORT=${DB_PORT:-5432}
read -p "Database Name (default flowventory): " DB_NAME
DB_NAME=${DB_NAME:-flowventory}
read -p "Database User: " DB_USER
read -sp "Database Password: " DB_PASSWORD
echo ""

# Construct DATABASE_URL
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${SERVER_HOST}:${DB_PORT}/${DB_NAME}"

echo ""
echo "Testing connection to server database..."
psql "$DATABASE_URL" -c "SELECT version();" > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✓ Connection successful!"
else
    echo "✗ Connection failed! Please check your credentials and server access."
    exit 1
fi

echo ""
echo "Importing data to server database..."
psql "$DATABASE_URL" < flowventory_backup.sql

if [ $? -eq 0 ]; then
    echo "✓ Data imported successfully!"
else
    echo "✗ Import failed!"
    exit 1
fi

echo ""
echo "========================================="
echo "Migration Complete!"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Update Docker/docker-compose.yml:"
echo "   - Comment out the 'db' service"
echo "   - Update backend environment DATABASE_URL to:"
echo "     DATABASE_URL: $DATABASE_URL"
echo ""
echo "2. Restart Docker containers:"
echo "   cd Docker"
echo "   docker-compose down"
echo "   docker-compose up -d"
echo ""
