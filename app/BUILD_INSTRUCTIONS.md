# Build Instructions for Live Streaming Pricing System

## Current Status

The live streaming pricing system has been fully implemented but requires database migration and Prisma client regeneration before it can build successfully.

## Build Errors and Solutions

### TypeScript Errors: Property 'pricingTier' does not exist

**Cause**: Prisma client not regenerated after database schema changes

**Solution**: Run database migration first, then regenerate Prisma client

### TypeScript Errors: Property 'timeSurcharge' does not exist

**Cause**: Same as above - Prisma client needs regeneration

**Solution**: Run database migration first, then regenerate Prisma client

## Step-by-Step Build Process

### Step 1: Database Migration (REQUIRED)

Choose one of the following methods:

#### Method A: Using MySQL Command Line

```bash
cd app
mysql -u [username] -p [database_name] < prisma/migrations/add_pricing_system.sql
```

#### Method B: Using phpMyAdmin

1. Open phpMyAdmin in your browser
2. Select your database
3. Click "Import" tab
4. Choose `prisma/migrations/add_pricing_system.sql` file
5. Click "Go" to execute

#### Method C: Using Setup Script

```bash
cd app
chmod +x build-and-setup.sh
./build-and-setup.sh
```

**Important**: The database migration MUST be completed before proceeding to Step 2.

### Step 2: Regenerate Prisma Client (REQUIRED)

```bash
cd app
npx prisma generate
```

This step updates TypeScript types based on the new database schema including:

- `pricingTier` model
- `timeSurcharge` model
- Updated `Package` model
- Updated `Booking` model

### Step 3: Install/Update Dependencies

```bash
cd app
bun install
```

### Step 4: Build the Application

```bash
cd app
bun run build
```

This should now complete successfully without TypeScript errors.

### Step 5: Start Development Server

```bash
cd app
bun run dev
```

## Verification

After completing all steps, verify:

### 1. Database Tables

```sql
-- Check if tables exist
SHOW TABLES LIKE 'pricing_tiers';
SHOW TABLES LIKE 'time_surcharges';

-- Check if columns added to existing tables
DESCRIBE packages;
DESCRIBE bookings;
```

### 2. Initial Data

```sql
-- Check pricing tiers
SELECT * FROM pricing_tiers;

-- Check time surcharges
SELECT * FROM time_surcharges;

-- Expected results:
-- 8 pricing tiers (4 for iPhone, 4 for Camera+OBS)
-- 3 time surcharges (normal, evening, early morning)
```

### 3. API Endpoints

```bash
# Test pricing calculation
curl -X POST http://localhost:3000/api/pricing/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "deviceType": "iPhone",
    "totalHours": 100,
    "timeSlots": [
      {"startTime": "09:00", "endTime": "11:00", "date": "2024-01-01"}
    ]
  }'

# Expected response should include pricing breakdown
```

### 4. Admin Pages

Access the following URLs to verify admin pages:

- http://localhost:3000/admin/pricing-tiers
- http://localhost:3000/admin/time-surcharges

## Troubleshooting

### Build Still Fails After Migration

#### Check 1: Verify Migration Completed

```sql
-- Run this in your database
SELECT COUNT(*) as tier_count FROM pricing_tiers;
SELECT COUNT(*) as surcharge_count FROM time_surcharges;
```

Expected results:

- `tier_count`: 8
- `surcharge_count`: 3

If counts are 0, migration didn't run properly.

#### Check 2: Verify Prisma Client Regeneration

```bash
cd app
npx prisma generate
```

Look for output like:

```
✔ Generated Prisma Client
```

If you see errors about missing models, the schema file wasn't read properly.

#### Check 3: Clear Build Cache

```bash
cd app
rm -rf .next
bun run build
```

#### Check 4: Verify TypeScript Configuration

```bash
cd app
npx tsc --noEmit
```

This will show TypeScript errors without building.

### Runtime Errors After Build

#### Error: "pricingTier does not exist"

**Cause**: Database migration not run or Prisma client not regenerated

**Solution**:

1. Verify database has `pricing_tiers` table
2. Run `npx prisma generate`
3. Restart development server

#### Error: "timeSurcharge does not exist"

**Cause**: Same as above

**Solution**: Same as above

#### Error: Pricing calculation returns 0

**Cause**: No pricing tiers in database or all inactive

**Solution**:

```sql
-- Check if tiers exist and are active
SELECT * FROM pricing_tiers WHERE isActive = 1;

-- If empty, run migration again
```

## Production Deployment

### Pre-Deployment Checklist

- [ ] Database migration completed on production database
- [ ] Prisma client regenerated
- [ ] Build completes successfully
- [ ] All API endpoints tested
- [ ] Admin pages accessible
- [ ] Pricing calculations verified

### Deployment Steps

1. **Database Migration**

   ```bash
   mysql -u [prod_user] -p [prod_database] < prisma/migrations/add_pricing_system.sql
   ```

2. **Generate Prisma Client**

   ```bash
   npx prisma generate
   ```

3. **Build Application**

   ```bash
   bun run build
   ```

4. **Deploy**
   Deploy the `.next` folder and necessary files to your hosting platform

5. **Verify**
   - Test booking flow
   - Verify pricing calculations
   - Check admin panel
   - Monitor error logs

## Quick Start Script

For a complete setup from scratch, use:

```bash
cd app
./build-and-setup.sh
```

This script will:

1. Install dependencies
2. Run database migration
3. Generate Prisma client
4. Build the application

## Summary

The build errors are expected until:

1. ✅ Database migration is completed
2. ✅ Prisma client is regenerated
3. ✅ Dependencies are installed

Once these steps are completed, the build will succeed and the pricing system will be fully functional.

## Support

If you encounter issues:

1. Check database connection in `.env` file
2. Verify database user has CREATE TABLE permissions
3. Check MySQL/MariaDB version compatibility
4. Review SQL migration file for any syntax errors
5. Check Prisma schema file for correct model definitions

## Next Steps After Successful Build

1. **Test Booking Flow**
   - Navigate to `/booking`
   - Select device type
   - Choose custom or package hours
   - Select time slots
   - Verify pricing calculations
   - Complete booking

2. **Test Admin Panel**
   - Navigate to `/admin/pricing-tiers`
   - Create/edit/delete pricing tiers
   - Navigate to `/admin/time-surcharges`
   - Create/edit/delete time surcharges

3. **Verify Pricing Logic**
   - Test tier boundaries (70, 140, 250 hours)
   - Test time surcharges (21:00-01:00, 01:00-07:00)
   - Verify minimum purchase validation (6 days custom, 5 days package)

4. **Monitor Performance**
   - Check API response times
   - Monitor database query performance
   - Verify pricing calculations are accurate

The pricing system is complete and ready to use once the build succeeds!
