# Export Table Structure - Quick Guide

## Option 1: Use Pre-generated export.sql (Fastest)

I've already created `app/export.sql` with all table structures.

**To use:**
```bash
cd app

# Import the structure
docker-compose exec -T db mysql -uroot -proot h5cr_main < export.sql
```

## Option 2: Export from phpMyAdmin (Visual)

### Quick Steps:

```bash
cd app
docker-compose up -d
```

1. Open http://localhost:8080
2. Login: `root` / `root`
3. Click `h5cr_main` database
4. Click "Export" tab
5. Click "Go" to download

### Export Options:
- **Structure only** - No data, just CREATE TABLE statements
- **Structure + Data** - Full backup with INSERT statements

## Option 3: Use Export Script (Automated)

### Windows:
```bash
cd app
export-structure.bat
```

### Linux/Mac:
```bash
cd app
chmod +x export-structure.sh
./export-structure.sh
```

**Options:**
1. Export structure only
2. Export full database (structure + data)
3. Export specific table
4. Export all tables separately
5. Show database information
6. View export files

## Option 4: Command Line (Manual)

### Export Structure Only:
```bash
cd app
docker-compose exec db mysqldump -uroot -proot --no-data h5cr_main > export.sql
```

### Export Full Database:
```bash
docker-compose exec db mysqldump -uroot -proot h5cr_main > export-full.sql
```

### Export Specific Table:
```bash
docker-compose exec db mysqldump -uroot -proot h5cr_main packages > export-packages.sql
```

## Files Available:

1. **export.sql** - Pre-generated table structure
2. **export-structure.bat** - Windows export script
3. **export-structure.sh** - Linux/Mac export script
4. **PHPMYADMIN_EXPORT_GUIDE.md** - Detailed phpMyAdmin guide

## Quick Start:

```bash
cd app

# 1. Start Docker
docker-compose up -d

# 2. Run Prisma migrations (to create tables)
npm run prisma:migrate

# 3. Export structure (choose one method):
#    A) Use existing export.sql
#    B) Open phpMyAdmin at http://localhost:8080
#    C) Run export-structure.bat
```

## Access phpMyAdmin:
- **URL:** http://localhost:8080
- **Username:** root
- **Password:** root
