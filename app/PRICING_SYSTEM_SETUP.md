# Live Streaming Pricing System - Setup Guide

## Overview

This guide will help you set up and deploy the live streaming pricing system with tiered pricing and time-based surcharges.

## Prerequisites

- Node.js 18+ or Bun
- MySQL database access
- Database credentials configured in `.env` file

## Setup Steps

### 1. Install Dependencies

```bash
cd app
bun install
```

### 2. Database Migration

#### Option A: Using MySQL Command Line

```bash
mysql -u [username] -p [database_name] < prisma/migrations/add_pricing_system.sql
```

#### Option B: Using phpMyAdmin

1. Open phpMyAdmin
2. Select your database
3. Click "Import" tab
4. Choose `prisma/migrations/add_pricing_system.sql`
5. Click "Go"

#### Option C: Using Setup Script

```bash
# On Linux/Mac
chmod +x build-and-setup.sh
./build-and-setup.sh

# On Windows (Git Bash or WSL)
./build-and-setup.sh
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

**Important**: This step is required after any database schema changes to update the TypeScript types.

### 4. Build the Application

```bash
bun run build
```

### 5. Start Development Server

```bash
bun run dev
```

## Verification

### Check Database Tables

After migration, verify these tables exist:

- `pricing_tiers` - Contains tiered pricing rules
- `time_surcharges` - Contains time-based surcharge rules

### Check Initial Data

Verify initial data has been seeded:

**Pricing Tiers:**

- iPhone: 0-70 hours @ 70,000 IDR/hour
- iPhone: 71-140 hours @ 65,000 IDR/hour
- iPhone: 141-250 hours @ 60,000 IDR/hour
- iPhone: 250+ hours @ 55,000 IDR/hour
- Camera+OBS: 0-70 hours @ 125,000 IDR/hour
- Camera+OBS: 71-140 hours @ 115,000 IDR/hour
- Camera+OBS: 141-200 hours @ 105,000 IDR/hour
- Camera+OBS: 200+ hours @ 95,000 IDR/hour

**Time Surcharges:**

- 07:00-21:00: 0 IDR (normal hours)
- 21:00-01:00: +15,000 IDR/hour
- 01:00-07:00: +20,000 IDR/hour

### Test API Endpoints

#### Pricing Calculation

```bash
curl -X POST http://localhost:3000/api/pricing/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "deviceType": "iPhone",
    "totalHours": 100,
    "timeSlots": [
      {"startTime": "09:00", "endTime": "11:00", "date": "2024-01-01"}
    ]
  }'
```

#### Admin Pricing Tiers

```bash
# Get all tiers
curl http://localhost:3000/api/admin/pricing-tiers

# Create new tier
curl -X POST http://localhost:3000/api/admin/pricing-tiers \
  -H "Content-Type: application/json" \
  -d '{
    "deviceType": "iPhone",
    "minHours": 0,
    "maxHours": 70,
    "pricePerHour": 70000,
    "isActive": true
  }'
```

#### Admin Time Surcharges

```bash
# Get all surcharges
curl http://localhost:3000/api/admin/time-surcharges

# Create new surcharge
curl -X POST http://localhost:3000/api/admin/time-surcharges \
  -H "Content-Type: application/json" \
  -d '{
    "startTime": "21:00",
    "endTime": "01:00",
    "surcharge": 15000,
    "description": "Evening surcharge",
    "isActive": true
  }'
```

## Testing Checklist

### Basic Functionality

- [ ] Access booking page at `/booking`
- [ ] Select device type (iPhone or Camera+OBS)
- [ ] Switch between "Custom Jam" and "Paket Jam" tabs
- [ ] Enter custom hours and see price calculation
- [ ] Select a package and see details
- [ ] Select time slots and see surcharge indicators
- [ ] View pricing breakdown in booking summary

### Pricing Calculations

- [ ] Test tiered pricing for iPhone (70, 140, 250 hours boundaries)
- [ ] Test tiered pricing for Camera+OBS (70, 140, 200 hours boundaries)
- [ ] Test normal hours pricing (07:00-21:00)
- [ ] Test evening surcharge (21:00-01:00)
- [ ] Test early morning surcharge (01:00-07:00)
- [ ] Verify minimum purchase validation (6 days custom, 5 days package)

### Admin Panel

- [ ] Access pricing tiers page at `/admin/pricing-tiers`
- [ ] Create new pricing tier
- [ ] Edit existing pricing tier
- [ ] Delete pricing tier
- [ ] Filter by device type
- [ ] Search pricing tiers
- [ ] Access time surcharges page at `/admin/time-surcharges`
- [ ] Create new time surcharge
- [ ] Edit existing time surcharge
- [ ] Delete time surcharge
- [ ] Activate/deactivate surcharges

### Booking Flow

- [ ] Complete full booking flow
- [ ] Verify correct pricing calculation
- [ ] Verify minimum day validation
- [ ] Verify surcharge application
- [ ] Verify tiered pricing application
- [ ] Complete payment process
- [ ] Verify booking data in database

## Troubleshooting

### Build Errors

#### TypeScript Errors: Property 'pricingTier' does not exist

**Cause**: Prisma client not regenerated after schema changes
**Solution**:

```bash
npx prisma generate
```

#### Module not found errors

**Cause**: Dependencies not installed
**Solution**:

```bash
bun install
```

### Database Errors

#### Table doesn't exist

**Cause**: Migration not run
**Solution**: Run the SQL migration file manually or use setup script

#### Foreign key constraint errors

**Cause**: Tables created in wrong order or missing
**Solution**: Drop tables and re-run migration:

```sql
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS pricing_tiers;
DROP TABLE IF EXISTS time_surcharges;
-- Then re-run migration
```

### Runtime Errors

#### Pricing calculation returns 0

**Cause**: No pricing tiers found in database
**Solution**: Verify pricing tiers exist and are active:

```sql
SELECT * FROM pricing_tiers WHERE isActive = 1;
```

#### Surcharges not applying

**Cause**: Time surcharges not configured or inactive
**Solution**: Verify time surcharges exist and are active:

```sql
SELECT * FROM time_surcharges WHERE isActive = 1;
```

#### Minimum validation not working

**Cause**: Booking type not set correctly
**Solution**: Verify packages have `bookingType` field set:

```sql
UPDATE packages SET bookingType = 'package' WHERE bookingType IS NULL;
```

## Production Deployment

### 1. Database Migration

Run migration on production database:

```bash
mysql -u [prod_user] -p [prod_database] < prisma/migrations/add_pricing_system.sql
```

### 2. Environment Variables

Ensure production `.env` has correct database credentials.

### 3. Build

```bash
bun run build
```

### 4. Deploy

Deploy the `.next` folder and necessary files to your hosting platform.

### 5. Verify

- Test booking flow in production
- Verify pricing calculations
- Check admin panel access
- Monitor error logs

## API Documentation

### Pricing Calculation API

**Endpoint**: `POST /api/pricing/calculate`

**Request Body**:

```json
{
  "deviceType": "iPhone" | "Camera+OBS",
  "totalHours": number,
  "timeSlots": [
    {
      "startTime": "HH:mm",
      "endTime": "HH:mm",
      "date": "YYYY-MM-DD"
    }
  ]
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "basePrice": number,
    "tieredPrice": number,
    "surcharges": [
      {
        "timeSlot": "HH:mm - HH:mm",
        "amount": number,
        "reason": string
      }
    ],
    "totalSurcharge": number,
    "finalPrice": number,
    "pricingTier": {
      "id": string,
      "deviceType": string,
      "minHours": number,
      "maxHours": number | null,
      "pricePerHour": number,
      "isActive": boolean
    },
    "totalHours": number
  }
}
```

### Admin Pricing Tiers API

**Endpoints**:

- `GET /api/admin/pricing-tiers` - List all tiers
- `POST /api/admin/pricing-tiers` - Create new tier
- `PUT /api/admin/pricing-tiers/[id]` - Update tier
- `DELETE /api/admin/pricing-tiers/[id]` - Delete tier

### Admin Time Surcharges API

**Endpoints**:

- `GET /api/admin/time-surcharges` - List all surcharges
- `POST /api/admin/time-surcharges` - Create new surcharge
- `PUT /api/admin/time-surcharges/[id]` - Update surcharge
- `DELETE /api/admin/time-surcharges/[id]` - Delete surcharge

## Support

For issues or questions:

1. Check implementation plan: `plans/live-streaming-pricing-system.md`
2. Review implementation summary: `IMPLEMENTATION_SUMMARY.md`
3. Check pricing utilities: `app/lib/pricing.ts`
4. Verify database schema: `app/prisma/schema.prisma`

## Summary

The live streaming pricing system includes:

- ✅ Tiered pricing based on total hours
- ✅ Time-based surcharges for non-operational hours
- ✅ Dynamic price calculation API
- ✅ Real-time pricing display in UI
- ✅ Minimum purchase validation
- ✅ Admin panel for pricing management
- ✅ Complete booking flow integration

Follow this guide to set up and deploy the system successfully!
