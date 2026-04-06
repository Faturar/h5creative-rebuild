-- Initialize database for Live Booking System
-- This file will be automatically executed when the MySQL container starts for the first time
-- Note: This file runs before Prisma migrations

-- The database is created by MYSQL_DATABASE environment variable in docker-compose.yml (h5cr_main)
-- This script is mainly for any initial setup needed before schema migration

FLUSH PRIVILEGES;

-- Note: The actual schema will be created by Prisma migrations
-- Run: npm run prisma:migrate
