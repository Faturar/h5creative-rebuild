#!/bin/bash

echo "=========================================="
echo "Live Streaming Pricing System Setup"
echo "=========================================="
echo ""

# Check if we're in the app directory
if [ ! -f "package.json" ]; then
    echo "Error: Please run this script from the app directory"
    exit 1
fi

echo "Step 1: Installing dependencies..."
bun install

echo ""
echo "Step 2: Running database migration..."
echo "Please ensure you have database credentials in .env file"
echo "Running SQL migration..."

# Check if mysql command exists
if command -v mysql &> /dev/null; then
    mysql -u root -p h5creative < prisma/migrations/add_pricing_system.sql
    echo "✓ Database migration completed"
else
    echo "⚠ MySQL command not found. Please run the migration manually:"
    echo "  mysql -u [username] -p [database_name] < prisma/migrations/add_pricing_system.sql"
fi

echo ""
echo "Step 3: Generating Prisma client..."
npx prisma generate

echo ""
echo "Step 4: Building the application..."
bun run build

echo ""
echo "=========================================="
echo "Setup completed!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Start the development server: bun run dev"
echo "2. Access the admin panel to manage pricing tiers"
echo "3. Test the booking flow with new pricing system"
echo ""
