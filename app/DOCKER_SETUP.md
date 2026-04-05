# Docker Setup Guide for Live Booking System

## Overview
This guide will help you set up the MySQL database and phpMyAdmin using Docker Compose for local development.

## Prerequisites
- Docker Desktop installed on your machine
- Basic knowledge of Docker commands

## Quick Start

### 1. Start the Database Containers

```bash
# Navigate to the app directory
cd app

# Start MySQL and phpMyAdmin in detached mode
docker-compose up -d

# Check the status of containers
docker-compose ps
```

### 2. Database Configuration

The `.env` file is already configured for Docker MySQL:

```
DATABASE_URL="mysql://root:root@localhost:3307/live_booking"
```

### 3. Access phpMyAdmin

Open your browser and navigate to: http://localhost:8080

**Login Credentials:**
- Username: `root`
- Password: `root`
- Server: `db`

### 4. Run Prisma Migrations

After starting the database, run the Prisma migrations:

```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# (Optional) Seed the database
npm run prisma:seed
```

## Docker Compose Services

### MySQL Database
- **Container Name:** `live_booking_db`
- **Image:** mysql:8.0
- **Port:** `3307:3306` (host:container)
- **Database Name:** `live_booking`
- **Root Password:** `root`
- **Additional User:** `dbuser` / `dbpassword`

### phpMyAdmin
- **Container Name:** `live_booking_phpmyadmin`
- **Image:** phpmyadmin/phpmyadmin:latest
- **Port:** `8080:80` (host:container)
- **Dependencies:** MySQL database (waits for it to be healthy)

## Common Docker Commands

### View Logs
```bash
# View all logs
docker-compose logs

# Follow database logs
docker-compose logs -f db

# View logs for specific container
docker-compose logs phpmyadmin
```

### Stop Services
```bash
# Stop containers (keeps data)
docker-compose stop

# Stop and remove containers (keeps volumes)
docker-compose down

# Stop and remove everything including volumes (resets database)
docker-compose down -v
```

### Restart Services
```bash
# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart db
```

### Access MySQL Container
```bash
# Access MySQL command line inside container
docker-compose exec db mysql -uroot -proot

# Use the database
USE live_booking;

# Exit MySQL
EXIT;
```

### Backup Database
```bash
# Create a backup
docker-compose exec db mysqldump -uroot -proot live_booking > backup.sql

# Restore from backup
docker-compose exec -T db mysql -uroot -proot live_booking < backup.sql
```

## Troubleshooting

### Database Connection Issues

**Problem:** Can't connect to database from the app

**Solutions:**
1. Ensure Docker is running: `docker ps`
2. Check if the database container is healthy: `docker-compose ps`
3. Verify the port is not already in use: `netstat -ano | findstr :3307`
4. Wait a few seconds after starting Docker for MySQL to be fully ready

### Port Conflicts

**Problem:** Port 3307 or 8080 is already in use

**Solution:** Edit `docker-compose.yml` and change the port mappings:

```yaml
ports:
  - "3308:3306"  # Change 3307 to another port
```

Update your `.env` file accordingly:
```
DATABASE_URL="mysql://root:root@localhost:3308/live_booking"
```

### Container Won't Start

**Problem:** MySQL container fails to start

**Solutions:**
1. Check logs: `docker-compose logs db`
2. Remove volumes and start fresh: `docker-compose down -v && docker-compose up -d`
3. Ensure you have enough disk space on your machine

### phpMyAdmin Can't Connect

**Problem:** phpMyAdmin shows connection error

**Solutions:**
1. Wait for MySQL to be fully healthy (check with `docker-compose ps`)
2. Check phpMyAdmin logs: `docker-compose logs phpmyadmin`
3. Verify database is running: `docker-compose ps db`

## Database Management

### Using Prisma Studio

```bash
# Open Prisma Studio to manage database visually
npm run prisma:studio
```

### Using phpMyAdmin

1. Open http://localhost:8080
2. Login with root/root
3. Select `live_booking` database
4. Browse tables, run SQL queries, manage data

### Direct SQL Access

```bash
# Access MySQL command line
docker-compose exec db mysql -uroot -proot live_booking

# Example queries once connected
SHOW TABLES;
SELECT * FROM packages LIMIT 10;
```

## Environment Variables

The following environment variables are used by Docker Compose:

| Variable | Value | Description |
|----------|-------|-------------|
| MYSQL_ROOT_PASSWORD | `root` | MySQL root password |
| MYSQL_DATABASE | `live_booking` | Database name |
| MYSQL_USER | `dbuser` | Additional MySQL user |
| MYSQL_PASSWORD | `dbpassword` | Additional user password |

## Production Deployment

For production, consider:

1. **Security:** Change default passwords
2. **Persistence:** Use named volumes for data backup
3. **Performance:** Tune MySQL configuration
4. **Monitoring:** Add health checks and monitoring
5. **Backup:** Implement regular database backup strategy

## Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [MySQL Docker Image](https://hub.docker.com/_/mysql)
- [Prisma Documentation](https://www.prisma.io/docs)
- [phpMyAdmin Docker Image](https://hub.docker.com/r/phpmyadmin/phpmyadmin)

## Support

If you encounter issues not covered in this guide:

1. Check Docker logs: `docker-compose logs`
2. Verify environment variables in `.env`
3. Ensure no conflicting services running
4. Check system requirements and disk space
