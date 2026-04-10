-- Migration: Add pricing system for live streaming
-- This migration adds support for tiered pricing and time-based surcharges

-- Create PricingTier table
CREATE TABLE IF NOT EXISTS `pricing_tiers` (
  `id` VARCHAR(191) NOT NULL,
  `deviceType` VARCHAR(191) NOT NULL,
  `minHours` INT NOT NULL,
  `maxHours` INT NULL,
  `pricePerHour` DECIMAL(10, 2) NOT NULL,
  `isActive` BOOLEAN NOT NULL DEFAULT TRUE,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create TimeSurcharge table
CREATE TABLE IF NOT EXISTS `time_surcharges` (
  `id` VARCHAR(191) NOT NULL,
  `startTime` VARCHAR(191) NOT NULL,
  `endTime` VARCHAR(191) NOT NULL,
  `surcharge` DECIMAL(10, 2) NOT NULL,
  `description` VARCHAR(191) NOT NULL,
  `isActive` BOOLEAN NOT NULL DEFAULT TRUE,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add new columns to packages table
ALTER TABLE `packages` 
ADD COLUMN IF NOT EXISTS `bookingType` VARCHAR(191) NOT NULL DEFAULT 'package',
ADD COLUMN IF NOT EXISTS `tieredPrice` BOOLEAN NOT NULL DEFAULT TRUE;

-- Add new columns to bookings table
ALTER TABLE `bookings`
ADD COLUMN IF NOT EXISTS `totalHours` INT NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS `basePrice` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS `surcharge` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS `finalPrice` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS `pricingTierId` VARCHAR(191) NULL,
ADD INDEX IF NOT EXISTS `bookings_pricingTierId_idx` (`pricingTierId`);

-- Add foreign key constraint for pricingTierId
ALTER TABLE `bookings`
ADD CONSTRAINT IF NOT EXISTS `bookings_pricingTierId_fkey` 
FOREIGN KEY (`pricingTierId`) REFERENCES `pricing_tiers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- Seed pricing tiers for iPhone
INSERT INTO `pricing_tiers` (`id`, `deviceType`, `minHours`, `maxHours`, `pricePerHour`, `isActive`) VALUES
(UUID(), 'iPhone', 0, 50, 65000.00, TRUE),
(UUID(), 'iPhone', 51, 70, 60000.00, TRUE),
(UUID(), 'iPhone', 71, 120, 58000.00, TRUE),
(UUID(), 'iPhone', 121, 150, 55000.00, TRUE),
(UUID(), 'iPhone', 151, NULL, 50000.00, TRUE);

-- Seed pricing tiers for Camera+OBS
INSERT INTO `pricing_tiers` (`id`, `deviceType`, `minHours`, `maxHours`, `pricePerHour`, `isActive`) VALUES
(UUID(), 'Camera+OBS', 0, 70, 120000.00, TRUE),
(UUID(), 'Camera+OBS', 71, 140, 115000.00, TRUE),
(UUID(), 'Camera+OBS', 141, 200, 105000.00, TRUE),
(UUID(), 'Camera+OBS', 201, NULL, 95000.00, TRUE);

-- Seed time surcharges
INSERT INTO `time_surcharges` (`id`, `startTime`, `endTime`, `surcharge`, `description`, `isActive`) VALUES
(UUID(), '07:00', '21:00', 0.00, 'Normal operational hours', TRUE),
(UUID(), '21:00', '01:00', 15000.00, 'Evening surcharge', TRUE),
(UUID(), '01:00', '07:00', 20000.00, 'Early morning surcharge', TRUE);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS `pricing_tiers_deviceType_isActive_idx` ON `pricing_tiers` (`deviceType`, `isActive`);
CREATE INDEX IF NOT EXISTS `time_surcharges_isActive_idx` ON `time_surcharges` (`isActive`);
