-- Table Structure Export for h5cr_main Database
-- This file contains CREATE TABLE statements for all tables
-- Generated from Prisma schema

-- Disable foreign key checks during schema creation
SET FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE IF NOT EXISTS `h5cr_main`;
USE `h5cr_main`;

-- Packages Table
CREATE TABLE IF NOT EXISTS `packages` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DECIMAL(10,2) NOT NULL,
    `promoPrice` DECIMAL(10,2) NULL,
    `durationMinutes` INT NOT NULL DEFAULT 120,
    `platform` VARCHAR(191) NOT NULL DEFAULT 'TikTok',
    `includesHost` TINYINT(1) NOT NULL DEFAULT 1,
    `includesStudio` TINYINT(1) NOT NULL DEFAULT 1,
    `includesDevice` TINYINT(1) NOT NULL DEFAULT 1,
    `isActive` TINYINT(1) NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Hosts Table
CREATE TABLE IF NOT EXISTS `hosts` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `bio` TEXT NOT NULL,
    `photoUrl` VARCHAR(191) NULL,
    `portfolioUrl` VARCHAR(191) NULL,
    `expertise` VARCHAR(191) NOT NULL,
    `rating` DECIMAL(2,1) NOT NULL DEFAULT 4.5,
    `totalStreams` INT NOT NULL DEFAULT 0,
    `languages` VARCHAR(191) NOT NULL DEFAULT 'Indonesian',
    `socialMediaLinks` TEXT NULL,
    `isActive` TINYINT(1) NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `hosts_expertise_isActive_idx` (`expertise`, `isActive`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Package-Host Junction Table
CREATE TABLE IF NOT EXISTS `package_hosts` (
    `id` VARCHAR(191) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `hostId` VARCHAR(191) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `package_hosts_packageId_hostId_key` (`packageId`, `hostId`),
    INDEX `package_hosts_packageId_fkey` (`packageId`),
    INDEX `package_hosts_hostId_fkey` (`hostId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Studios Table
CREATE TABLE IF NOT EXISTS `studios` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `photoUrl` VARCHAR(191) NULL,
    `capacity` INT NOT NULL DEFAULT 4,
    `equipment` TEXT NOT NULL,
    `amenities` TEXT NULL,
    `isActive` TINYINT(1) NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Studio Slots Table
CREATE TABLE IF NOT EXISTS `studio_slots` (
    `id` VARCHAR(191) NOT NULL,
    `studioId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `startTime` VARCHAR(191) NOT NULL,
    `endTime` VARCHAR(191) NOT NULL,
    `isBooked` TINYINT(1) NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `booking` VARCHAR(191) NULL UNIQUE,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `studio_slots_studioId_date_startTime_key` (`studioId`, `date`, `startTime`),
    INDEX `studio_slots_studioId_date_isBooked_idx` (`studioId`, `date`, `isBooked`),
    INDEX `studio_slots_booking_fkey` (`booking`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bookings Table
CREATE TABLE IF NOT EXISTS `bookings` (
    `id` VARCHAR(191) NOT NULL,
    `bookingCode` VARCHAR(191) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `hostId` VARCHAR(191) NOT NULL,
    `studioId` VARCHAR(191) NOT NULL,
    `studioSlotId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `startTime` VARCHAR(191) NOT NULL,
    `endTime` VARCHAR(191) NOT NULL,
    `customerName` VARCHAR(191) NOT NULL,
    `customerPhone` VARCHAR(191) NOT NULL,
    `customerEmail` VARCHAR(191) NOT NULL,
    `businessName` VARCHAR(191) NOT NULL,
    `productCategory` VARCHAR(191) NOT NULL,
    `price` DECIMAL(10,2) NOT NULL,
    `status` ENUM('PENDING', 'PAID', 'CANCELLED', 'COMPLETED', 'IN_PROGRESS', 'FINISHED') NOT NULL DEFAULT 'PENDING',
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `bookings_bookingCode_key` (`bookingCode`),
    INDEX `bookings_status_date_idx` (`status`, `date`),
    INDEX `bookings_packageId_fkey` (`packageId`),
    INDEX `bookings_hostId_fkey` (`hostId`),
    INDEX `bookings_studioId_fkey` (`studioId`),
    INDEX `bookings_studioSlotId_fkey` (`studioSlotId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Payments Table
CREATE TABLE IF NOT EXISTS `payments` (
    `id` VARCHAR(191) NOT NULL,
    `bookingId` VARCHAR(191) NOT NULL,
    `paymentGateway` VARCHAR(191) NOT NULL DEFAULT 'midtrans',
    `transactionId` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(10,2) NOT NULL,
    `status` ENUM('PENDING', 'SUCCESS', 'FAILED', 'EXPIRED') NOT NULL DEFAULT 'PENDING',
    `paidAt` DATETIME(3) NULL,
    `rawResponse` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    UNIQUE INDEX `payments_transactionId_key` (`transactionId`),
    INDEX `payments_bookingId_status_idx` (`bookingId`, `status`),
    INDEX `payments_bookingId_fkey` (`bookingId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Foreign Key Constraints
ALTER TABLE `package_hosts` ADD CONSTRAINT `package_hosts_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `packages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `package_hosts` ADD CONSTRAINT `package_hosts_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `hosts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `studio_slots` ADD CONSTRAINT `studio_slots_studioId_fkey` FOREIGN KEY (`studioId`) REFERENCES `studios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `studio_slots` ADD CONSTRAINT `studio_slots_booking_fkey` FOREIGN KEY (`booking`) REFERENCES `bookings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `bookings` ADD CONSTRAINT `bookings_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `packages`(`id`) ON UPDATE CASCADE;
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `hosts`(`id`) ON UPDATE CASCADE;
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_studioId_fkey` FOREIGN KEY (`studioId`) REFERENCES `studios`(`id`) ON UPDATE CASCADE;
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_studioSlotId_fkey` FOREIGN KEY (`studioSlotId`) REFERENCES `studio_slots`(`id`) ON UPDATE CASCADE;

ALTER TABLE `payments` ADD CONSTRAINT `payments_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Re-enable foreign key checks after schema creation
SET FOREIGN_KEY_CHECKS = 1;

FLUSH PRIVILEGES;
