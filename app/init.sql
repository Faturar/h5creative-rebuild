-- Initialize database for Live Booking System
-- This file will be automatically executed when the MySQL container starts for the first time

-- Create database if not exists (this is also handled by MYSQL_DATABASE in docker-compose)
CREATE DATABASE IF NOT EXISTS live_booking;

-- Use the database
USE live_booking;

-- Grant privileges (handled by MySQL environment variables, but explicit is good for clarity)
FLUSH PRIVILEGES;
