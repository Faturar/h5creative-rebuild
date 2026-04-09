/*
  Warnings:

  - You are about to drop the column `durationMinutes` on the `packages` table. All the data in the column will be lost.
  - You are about to drop the column `platform` on the `packages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `packages` DROP COLUMN `durationMinutes`,
    DROP COLUMN `platform`,
    ADD COLUMN `accountReport` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `durationPerSession` INTEGER NOT NULL DEFAULT 2,
    ADD COLUMN `hostCount` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `numberOfDays` INTEGER NOT NULL DEFAULT 14,
    ADD COLUMN `packageType` VARCHAR(191) NOT NULL DEFAULT 'iPhone',
    ADD COLUMN `totalHours` INTEGER NOT NULL DEFAULT 28,
    ADD COLUMN `twibbonDesignCount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `weeklyReport` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `workDays` VARCHAR(191) NOT NULL DEFAULT 'Senin - Sabtu',
    ADD COLUMN `workTimeEnd` VARCHAR(191) NOT NULL DEFAULT '20:00',
    ADD COLUMN `workTimeStart` VARCHAR(191) NOT NULL DEFAULT '09:00';

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'STAFF') NOT NULL DEFAULT 'ADMIN',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `lastLoginAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_email_isActive_idx`(`email`, `isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `custom_slot_requests` (
    `id` VARCHAR(191) NOT NULL,
    `studioId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `startTime` VARCHAR(191) NOT NULL,
    `endTime` VARCHAR(191) NOT NULL,
    `customerName` VARCHAR(191) NOT NULL,
    `customerPhone` VARCHAR(191) NULL,
    `customerEmail` VARCHAR(191) NULL,
    `notes` TEXT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `adminNotes` TEXT NULL,
    `studioSlotId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `custom_slot_requests_studioId_status_idx`(`studioId`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `custom_slot_requests` ADD CONSTRAINT `custom_slot_requests_studioId_fkey` FOREIGN KEY (`studioId`) REFERENCES `studios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
