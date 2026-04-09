/*
  Warnings:

  - Added the required column `basePrice` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finalPrice` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bookings` ADD COLUMN `basePrice` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `finalPrice` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `pricingTierId` VARCHAR(191) NULL,
    ADD COLUMN `surcharge` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    ADD COLUMN `totalHours` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `packages` ADD COLUMN `bookingType` VARCHAR(191) NOT NULL DEFAULT 'package',
    ADD COLUMN `tieredPrice` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `pricing_tiers` (
    `id` VARCHAR(191) NOT NULL,
    `deviceType` VARCHAR(191) NOT NULL,
    `minHours` INTEGER NOT NULL,
    `maxHours` INTEGER NULL,
    `pricePerHour` DECIMAL(10, 2) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `pricing_tiers_deviceType_isActive_idx`(`deviceType`, `isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `time_surcharges` (
    `id` VARCHAR(191) NOT NULL,
    `startTime` VARCHAR(191) NOT NULL,
    `endTime` VARCHAR(191) NOT NULL,
    `surcharge` DECIMAL(10, 2) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `time_surcharges_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `bookings_pricingTierId_idx` ON `bookings`(`pricingTierId`);

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_pricingTierId_fkey` FOREIGN KEY (`pricingTierId`) REFERENCES `pricing_tiers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
