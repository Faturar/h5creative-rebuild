# How to Export Table Structure from phpMyAdmin

## Option 1: Use the Pre-generated export.sql

I've already created `app/export.sql` with all table structures based on your Prisma schema. You can use this file directly.

## Option 2: Export from phpMyAdmin

### Step 1: Start Docker and phpMyAdmin

```bash
cd app
docker-compose up -d
```

Wait for containers to start, then access: http://localhost:8080

### Step 2: Login to phpMyAdmin

**Login Credentials:**
- Username: `root`
- Password: `root`
- Server: `db`

### Step 3: Select Database

1. From the left sidebar, click on `h5cr_main` database
2. Make sure all tables exist (if you ran Prisma migrations)

### Step 4: Export Table Structure

**Method A: Export Individual Table**
1. Click on the table name (e.g., `packages`)
2. Click the "Export" tab at the top
3. Select export method: "Quick" or "Custom"
4. Select format: "SQL"
5. Check "Structure only" if you don't want data
6. Click "Go" to download

**Method B: Export Multiple Tables**
1. Click on `h5cr_main` database
2. Click the "Export" tab at the top
3. Select the tables you want to export
4. Choose export options:
   - Format: SQL
   - Structure: Check "Add DROP TABLE/VIEW/PROCEDURE/FUNCTION/EVENT/TRIGGER statement"
   - Structure: Check "Add AUTO_INCREMENT value"
   - Data: Uncheck if you only want structure
5. Click "Go" to download

### Step 5: Save Export File

1. The browser will download a file (e.g., `h5cr_main.sql`)
2. Save it as `export.sql` in your `app` directory
3. You can edit it or use it as backup

## Export Options Explained

### Export Method: Quick
- Simple export with default settings
- Good for quick backups

### Export Method: Custom
- More options for fine-tuning export
- Recommended for production exports

### SQL Export Options

**Structure Options:**
- **Add DROP TABLE:** Adds `DROP TABLE IF EXISTS` before CREATE statements
- **Add AUTO_INCREMENT:** Includes auto-increment values
- **Enclose table and field names:** Uses backticks for names

**Data Options:**
- **Complete inserts:** Includes column names in INSERT statements
- **Extended inserts:** Combines multiple rows in single INSERT
- **Maximal length of created query:** Limits query length

### Format-Specific Options:

**SQL:**
- Include comments: Add comments to exported file
- Disable foreign key checks: Helpful for importing

## Common Use Cases

### 1. Backup Database Structure
```bash
# Export structure only
# Select "Structure only" in export options
```

### 2. Backup Database with Data
```bash
# Export structure + data
# Check both "Structure" and "Data" in export options
```

### 3. Create Template for New Database
```bash
# Export structure only
# Remove data and keep only CREATE TABLE statements
# Rename database in exported file
```

### 4. Compare Schema Differences
```bash
# Export structure from two databases
# Use diff tool to compare CREATE TABLE statements
```

## Alternative: Command Line Export

If you prefer using command line instead of phpMyAdmin:

```bash
# Export structure only
docker-compose exec db mysqldump -uroot -proot --no-data h5cr_main > export-structure.sql

# Export with data
docker-compose exec db mysqldump -uroot -proot h5cr_main > export-full.sql

# Export specific table structure
docker-compose exec db mysqldump -uroot -proot --no-data h5cr_main packages > export-packages.sql

# Export specific table with data
docker-compose exec db mysqldump -uroot -proot h5cr_main packages > export-packages-data.sql
```

## Using the Exported File

### To Import to Empty Database:

```bash
# Method 1: Using phpMyAdmin
1. Open phpMyAdmin
2. Select database or create new one
3. Click "Import" tab
4. Choose your export.sql file
5. Click "Go"

# Method 2: Using command line
docker-compose exec -T db mysql -uroot -proot h5cr_main < export.sql
```

### To Import to Existing Database:

Be careful with DROP TABLE statements - they will delete existing data!

```sql
-- Edit the exported file and remove or comment out:
DROP TABLE IF EXISTS `packages`;
```

## Troubleshooting

### Export Fails with Timeouts
- Reduce export size by exporting fewer tables at once
- Increase PHP max_execution_time in phpMyAdmin config

### Import Fails with Foreign Key Errors
- Add these at the beginning of import file:
```sql
SET FOREIGN_KEY_CHECKS = 0;
```
- Add this at the end:
```sql
SET FOREIGN_KEY_CHECKS = 1;
```

### Export File Too Large
- Export tables individually
- Use "Custom" export and select fewer tables
- Use command line export instead

## Tips

1. **Always include DROP TABLE statements** in production exports
2. **Use Structure Only** when creating templates
3. **Include comments** for documentation
4. **Test import** on staging before production
5. **Keep version history** of export files

## Quick Reference

**Export All Tables (phpMyAdmin):**
1. Open http://localhost:8080
2. Login: root/root
3. Select `h5cr_main` database
4. Click "Export" tab
5. Click "Go"

**Export Using Command Line:**
```bash
cd app
docker-compose exec db mysqldump -uroot -proot --no-data h5cr_main > export.sql
```

**Export All Tables (with data):**
```bash
docker-compose exec db mysqldump -uroot -proot h5cr_main > export-full.sql
```
