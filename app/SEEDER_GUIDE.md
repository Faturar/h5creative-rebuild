# Database Seeder Guide

This guide explains how to properly seed the database with initial data for the booking system.

## Prerequisites

Before running the seeder, ensure:

1. **MySQL is running** - Make sure your MySQL server is running and accessible
2. **Database exists** - The database `live_booking` should exist (or update the DATABASE_URL in `.env`)
3. **Environment variables are set** - The `.env` file should contain `DATABASE_URL`

## Running the Seeder

### Option 1: Fresh Database (Recommended)

If you want to start with a clean database:

```bash
# Reset the database (deletes all data and re-runs migrations)
bun run prisma:reset

# This will automatically run the seed script after reset
```

### Option 2: Seed Existing Database

If the database already has the schema but no data:

```bash
# Run the seed script
bun run prisma:seed
```

### Option 3: Manual Steps

For more control:

```bash
# Generate Prisma Client
bun run prisma:generate

# Run migrations (if not already done)
bun run prisma:migrate

# Run seed
bun run prisma:seed
```

## What Gets Seeded?

The seeder creates the following data:

### 1. Packages (5 items)

- Paket Starter - TikTok (Rp 1.500.000)
- Paket Business - TikTok (Rp 3.000.000)
- Paket Enterprise - TikTok (Rp 5.000.000)
- Paket Shopee Starter - Shopee (Rp 1.800.000)
- Paket Instagram Live - Instagram (Rp 2.000.000)

### 2. Hosts (5 items)

- Sarah Wijaya - Fashion Expert
- Budi Santoso - F&B Expert
- Dewi Lestari - Beauty Expert
- Rizky Pratama - Electronics Expert
- Anita Sari - Fashion Expert

### 3. Studios (3 items)

- Studio Central Jakarta - Jakarta Pusat (Capacity: 6)
- Studio South Jakarta - Jakarta Selatan (Capacity: 8)
- Studio West Jakarta - Jakarta Barat (Capacity: 4)

### 4. Studio Slots

- 6 time slots per day (09:00-21:00)
- For the next 7 days
- Total: 126 slots (3 studios × 7 days × 6 slots)

### 5. Host-Package Links

- All hosts are linked to all packages
- Total: 25 links (5 hosts × 5 packages)

## Troubleshooting

### Error: "Database already contains data"

The seeder is designed to be idempotent - it won't seed if data already exists. To re-seed:

```bash
bun run prisma:reset
```

### Error: "Can't reach database server"

Check that:

1. MySQL is running
2. The DATABASE_URL in `.env` is correct
3. MySQL is listening on the specified port (default: 3306)

### Error: "Unknown database"

Create the database first:

```sql
CREATE DATABASE live_booking;
```

### Error: "Access denied for user"

Check the credentials in DATABASE_URL:

- Default: `mysql://root:@localhost:3306/live_booking`
- Format: `mysql://username:password@host:port/database`

## Verifying the Seed

After seeding, you can verify the data:

### Using Prisma Studio (GUI)

```bash
bun run prisma:studio
```

This opens a web interface to view and edit your data.

### Using Database Queries

```bash
# Connect to MySQL
mysql -u root -p live_booking

# Check counts
SELECT 'packages' as table_name, COUNT(*) as count FROM packages
UNION ALL
SELECT 'hosts', COUNT(*) FROM hosts
UNION ALL
SELECT 'studios', COUNT(*) FROM studios
UNION ALL
SELECT 'studio_slots', COUNT(*) FROM studio_slots
UNION ALL
SELECT 'package_hosts', COUNT(*) FROM package_hosts;
```

## Seeder Features

The improved seeder includes:

✅ **Idempotent** - Won't duplicate data if run multiple times
✅ **Transaction-based** - All data is created atomically (all or nothing)
✅ **Decimal handling** - Properly handles Prisma Decimal types
✅ **Error handling** - Comprehensive error messages and logging
✅ **Progress tracking** - Shows what's being created
✅ **Data validation** - Verifies data after creation
✅ **Connection logging** - Shows database connection status

## Customizing the Seed

To modify the seeded data, edit `prisma/seed.ts`:

1. Add/remove packages in the packages array
2. Add/remove hosts in the hosts array
3. Add/remove studios in the studios array
4. Adjust time slots or date ranges
5. Modify pricing, descriptions, etc.

After changes, re-run:

```bash
bun run prisma:reset
```

## Production Considerations

⚠️ **Warning**: Never run the seeder in production with real data!

The seeder:

- Deletes all existing data if using `prisma:reset`
- Creates test/demo data only
- Should only be used in development/staging environments

For production, use proper database migrations and data management tools.
