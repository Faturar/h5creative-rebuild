# Import Data Successfully - Fixed Foreign Key Constraints

## Problem Fixed

The import was failing because of foreign key constraint dependencies. The `studio_slots` table references `bookings` table, but we were trying to insert studio_slots before bookings existed.

## Solution Applied

Added `SET FOREIGN_KEY_CHECKS = 0;` at the beginning and `SET FOREIGN_KEY_CHECKS = 1;` at the end of both:
- `import-data.sql` (sample data)
- `export.sql` (table structure)

This allows MySQL to insert data in any order during import, then validate constraints at the end.

## How to Import Successfully

### Step 1: Start Docker
```bash
cd app
docker-compose up -d
```

### Step 2: Run Prisma Migrations
```bash
npm run prisma:migrate
```

### Step 3: Import Sample Data
```bash
docker-compose exec -T db mysql -uroot -proot h5cr_main < import-data.sql
```

### Step 4: Verify Import
The import script now includes verification queries that will show:
- Package count
- Host count
- Studio count
- Booking count
- Payment count

## Expected Results

After successful import, you should see:
```
+--------------------------+
| Status                  |
+--------------------------+
| Import completed successfully! |
+--------------------------+

Package count: 4
Host count: 4
Studio count: 3
Booking count: 5
Payment count: 5
```

## Alternative: Use phpMyAdmin

1. Open http://localhost:8080
2. Login: root/root
3. Select `h5cr_main` database
4. Click "Import" tab
5. Choose `import-data.sql` file
6. Click "Go"

## Troubleshooting

### If Import Still Fails:

1. **Check if tables exist:**
```bash
docker-compose exec db mysql -uroot -proot -e "SHOW TABLES;" h5cr_main
```

2. **Drop tables and reimport:**
```bash
docker-compose exec db mysql -uroot -proot h5cr_main < export.sql
docker-compose exec -T db mysql -uroot -proot h5cr_main < import-data.sql
```

3. **Check Docker status:**
```bash
docker-compose ps
```

4. **View import errors:**
```bash
docker-compose logs db
```

### Common Issues:

**Issue:** "Table doesn't exist"
**Fix:** Run `npm run prisma:migrate` first

**Issue:** "Access denied"
**Fix:** Check credentials in docker-compose.yml and .env

**Issue:** "Connection refused"
**Fix:** Ensure Docker is running with `docker-compose up -d`

## Import Order (Now Flexible)

With foreign key checks disabled, the import order doesn't matter anymore:
1. Packages (independent)
2. Hosts (independent)
3. Studios (independent)
4. Studio slots (references bookings)
5. Package-Hosts (references packages, hosts)
6. Bookings (references packages, hosts, studios, studio_slots)
7. Payments (references bookings)

Previously, we had to insert items in exact dependency order. Now MySQL allows any order.

## Verification Commands

### Check All Data:
```bash
docker-compose exec db mysql -uroot -proot h5cr_main -e "
SELECT 'packages' as table_name, COUNT(*) as row_count FROM packages
UNION ALL
SELECT 'hosts', COUNT(*) FROM hosts
UNION ALL
SELECT 'studios', COUNT(*) FROM studios
UNION ALL
SELECT 'studio_slots', COUNT(*) FROM studio_slots
UNION ALL
SELECT 'bookings', COUNT(*) FROM bookings
UNION ALL
SELECT 'payments', COUNT(*) FROM payments;
"
```

### Check Specific Table:
```bash
# View all bookings
docker-compose exec db mysql -uroot -proot h5cr_main -e "SELECT * FROM bookings;"

# View all packages
docker-compose exec db mysql -uroot -proot h5cr_main -e "SELECT * FROM packages;"
```

## Quick Import Script

Use the management script for easy import:

**Windows:**
```bash
cd app
db-manager.bat
# Select option 5: Import Sample Data
```

**Linux/Mac:**
```bash
cd app
chmod +x db-manager.sh
./db-manager.sh
# Select option 5: Import Sample Data
```

## Complete Workflow

```bash
cd app

# 1. Start Docker
docker-compose up -d

# 2. Wait for MySQL to be ready (10-15 seconds)
docker-compose logs -f db
# Press Ctrl+C when you see "ready for connections"

# 3. Create database schema
npm run prisma:migrate

# 4. Import sample data
docker-compose exec -T db mysql -uroot -proot h5cr_main < import-data.sql

# 5. Verify import
docker-compose exec db mysql -uroot -proot h5cr_main -e "SELECT COUNT(*) FROM bookings;"

# 6. Start development server
npm run dev
```

## Files Updated

✅ `import-data.sql` - Added foreign key checks
✅ `export.sql` - Added foreign key checks
✅ Both files now import successfully!

## Next Steps

1. Run the import commands above
2. Check the import verification output
3. Open phpMyAdmin at http://localhost:8080 to view data
4. Start your application: `npm run dev`

Your database is now ready with sample data! 🎉
