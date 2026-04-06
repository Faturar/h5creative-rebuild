# Live Booking System - Docker Setup Complete

## Overview
Your Live Booking System now has a complete Docker setup for MySQL database with automated sample data import.

## Files Created/Modified

### Docker Configuration
- **docker-compose.yml** - MySQL 8.0 + phpMyAdmin containers
- **init.sql** - Database initialization script
- **import-data.sql** - Sample data with 4 packages, 4 hosts, 3 studios, 5 bookings, 5 payments
- **.dockerignore** - Docker context optimization

### Database Management
- **db-manager.bat** - Windows database management script
- **db-manager.sh** - Linux/Mac database management script
- **DOCKER_SETUP.md** - Comprehensive Docker guide

### Configuration Updates
- **.env** - Updated DATABASE_URL for Docker MySQL (port 3307)
- **.env.example** - Added Docker configuration option
- **README.md** - Added Docker setup instructions

## Quick Start

### 1. Start the Database
```bash
cd app
docker-compose up -d
```

### 2. Run Prisma Migrations
```bash
npm run prisma:migrate
```

### 3. Import Sample Data (Automatic)
Sample data is automatically imported when you first start the database.

### 4. Access Database Tools
- **phpMyAdmin:** http://localhost:8080 (user: root, pass: root)
- **Prisma Studio:** Run `npm run prisma:studio`

### 5. Start the Application
```bash
npm run dev
```
Access at: http://localhost:3000

## Database Details

### Connection Information
- **Host:** localhost
- **Port:** 3307
- **Database:** live_booking
- **User:** root
- **Password:** root
- **Connection String:** `mysql://root:root@localhost:3307/live_booking`

### Sample Data Overview
- **Packages (4):** TikTok Live Starter, Shopee Live Pro, Instagram Live Premium, Tokopedia Mega Live
- **Hosts (4):** Sarah Wijaya (Beauty), Budi Santoso (Tech), Anita Putri (F&B), David Gunawan (Fashion)
- **Studios (3):** Jakarta Central, Bandung Creative, Surabaya Premium
- **Bookings (5):** Various statuses (PENDING, PAID, COMPLETED)
- **Payments (5):** Different statuses (PENDING, SUCCESS)

## Database Management Scripts

### Using the Interactive Menu

**Windows:**
```bash
db-manager.bat
```

**Linux/Mac:**
```bash
chmod +x db-manager.sh
./db-manager.sh
```

### Available Operations
1. Start Database Services
2. Stop Database Services
3. Restart Database Services
4. Reset Database (Delete All Data)
5. Import Sample Data
6. Run Prisma Migrations
7. Open Prisma Studio
8. Open phpMyAdmin
9. View Database Logs
10. Backup Database
11. Restore Database
12. Check Database Status

## Manual Docker Commands

### Start/Stop
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose stop

# Restart services
docker-compose restart

# Remove services (keeps data)
docker-compose down

# Remove everything including data
docker-compose down -v
```

### Database Operations
```bash
# Import sample data
docker-compose exec -T db mysql -uroot -proot live_booking < import-data.sql

# Backup database
docker-compose exec db mysqldump -uroot -proot live_booking > backup.sql

# Restore database
docker-compose exec -T db mysql -uroot -proot live_booking < backup.sql

# Access MySQL command line
docker-compose exec db mysql -uroot -proot live_booking
```

### Logs and Status
```bash
# View logs
docker-compose logs -f db

# Check container status
docker-compose ps

# Check database health
docker-compose exec db mysqladmin ping -h localhost -uroot -proot
```

## Troubleshooting

### Port Conflicts
If port 3307 or 8080 is already in use, edit `docker-compose.yml`:

```yaml
ports:
  - "3308:3306"  # Change host port
```

Update `.env` accordingly:
```
DATABASE_URL="mysql://root:root@localhost:3308/live_booking"
```

### Connection Issues
1. Ensure Docker is running: `docker ps`
2. Check container status: `docker-compose ps`
3. Wait for MySQL to be healthy (takes ~10-15 seconds)
4. Check logs: `docker-compose logs db`

### Database Reset
```bash
# Completely reset database (deletes all data)
docker-compose down -v
docker-compose up -d
npm run prisma:migrate
```

## Development Workflow

### Typical Development Session
```bash
# 1. Start database
docker-compose up -d

# 2. Run migrations (if schema changed)
npm run prisma:migrate

# 3. Start Next.js dev server
npm run dev

# 4. When done
docker-compose stop
```

### After Schema Changes
```bash
# 1. Update Prisma schema
# 2. Create migration
npx prisma migrate dev --name <migration-name>

# 3. Generate Prisma client
npm run prisma:generate
```

## Production Considerations

### Security Changes
- Change default passwords in `docker-compose.yml`
- Use environment variables for credentials
- Remove phpMyAdmin in production

### Performance Tuning
- Adjust MySQL configuration in `docker-compose.yml`
- Increase resource limits for containers
- Use persistent volumes with backup strategy

### Monitoring
- Add health checks
- Set up logging aggregation
- Monitor database performance metrics

## Additional Resources

- **Full Docker Guide:** `DOCKER_SETUP.md`
- **Database Schema:** `prisma/schema.prisma`
- **Seeding Guide:** `SEEDER_GUIDE.md`
- **Admin Dashboard:** `ADMIN_DASHBOARD_README.md`
- **Booking System:** `BOOKING_SYSTEM_README.md`

## Support

For issues or questions:
1. Check `DOCKER_SETUP.md` for detailed troubleshooting
2. Review Docker logs: `docker-compose logs`
3. Verify environment variables in `.env`
4. Ensure no conflicting services running

## Next Steps

1. ✅ Start Docker database: `docker-compose up -d`
2. ✅ Run migrations: `npm run prisma:migrate`
3. ✅ Import sample data (automatic)
4. ✅ Start development server: `npm run dev`
5. ✅ Access phpMyAdmin: http://localhost:8080
6. ✅ Start building your features!

---

**Setup Complete!** 🎉

Your Live Booking System is now ready for development with Docker MySQL database.
