-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_packageId_fkey`;

-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_studioSlotId_fkey`;

-- AlterTable
ALTER TABLE `bookings` MODIFY `packageId` VARCHAR(191) NULL,
    MODIFY `studioSlotId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `packages` ADD COLUMN `hasActivePromo` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `promoDiscountType` VARCHAR(191) NULL DEFAULT 'fixed',
    ADD COLUMN `promoDiscountValue` DECIMAL(10, 2) NULL,
    ADD COLUMN `promoEndDate` DATETIME(3) NULL,
    ADD COLUMN `promoStartDate` DATETIME(3) NULL,
    ADD COLUMN `promoTitle` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `packages`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_studioSlotId_fkey` FOREIGN KEY (`studioSlotId`) REFERENCES `studio_slots`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
