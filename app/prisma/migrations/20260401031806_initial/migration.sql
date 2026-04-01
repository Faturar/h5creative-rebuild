-- CreateTable
CREATE TABLE `packages` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `promoPrice` DECIMAL(10, 2) NULL,
    `durationMinutes` INTEGER NOT NULL DEFAULT 120,
    `platform` VARCHAR(191) NOT NULL DEFAULT 'TikTok',
    `includesHost` BOOLEAN NOT NULL DEFAULT true,
    `includesStudio` BOOLEAN NOT NULL DEFAULT true,
    `includesDevice` BOOLEAN NOT NULL DEFAULT true,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hosts` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `bio` TEXT NOT NULL,
    `photoUrl` VARCHAR(191) NULL,
    `portfolioUrl` VARCHAR(191) NULL,
    `expertise` VARCHAR(191) NOT NULL,
    `rating` DECIMAL(2, 1) NOT NULL DEFAULT 4.5,
    `totalStreams` INTEGER NOT NULL DEFAULT 0,
    `languages` VARCHAR(191) NOT NULL DEFAULT 'Indonesian',
    `socialMediaLinks` TEXT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `hosts_expertise_isActive_idx`(`expertise`, `isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package_hosts` (
    `id` VARCHAR(191) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `hostId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `package_hosts_packageId_hostId_key`(`packageId`, `hostId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `studios` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `photoUrl` VARCHAR(191) NULL,
    `capacity` INTEGER NOT NULL DEFAULT 4,
    `equipment` TEXT NOT NULL,
    `amenities` TEXT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `studio_slots` (
    `id` VARCHAR(191) NOT NULL,
    `studioId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `startTime` VARCHAR(191) NOT NULL,
    `endTime` VARCHAR(191) NOT NULL,
    `isBooked` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `studio_slots_studioId_date_isBooked_idx`(`studioId`, `date`, `isBooked`),
    UNIQUE INDEX `studio_slots_studioId_date_startTime_key`(`studioId`, `date`, `startTime`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookings` (
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
    `price` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('PENDING', 'PAID', 'CANCELLED', 'COMPLETED', 'IN_PROGRESS', 'FINISHED') NOT NULL DEFAULT 'PENDING',
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `bookings_bookingCode_key`(`bookingCode`),
    UNIQUE INDEX `bookings_studioSlotId_key`(`studioSlotId`),
    INDEX `bookings_status_date_idx`(`status`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id` VARCHAR(191) NOT NULL,
    `bookingId` VARCHAR(191) NOT NULL,
    `paymentGateway` VARCHAR(191) NOT NULL DEFAULT 'midtrans',
    `transactionId` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('PENDING', 'SUCCESS', 'FAILED', 'EXPIRED') NOT NULL DEFAULT 'PENDING',
    `paidAt` DATETIME(3) NULL,
    `rawResponse` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `payments_transactionId_key`(`transactionId`),
    INDEX `payments_bookingId_status_idx`(`bookingId`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `package_hosts` ADD CONSTRAINT `package_hosts_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `packages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `package_hosts` ADD CONSTRAINT `package_hosts_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `hosts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studio_slots` ADD CONSTRAINT `studio_slots_studioId_fkey` FOREIGN KEY (`studioId`) REFERENCES `studios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `packages`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `hosts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_studioId_fkey` FOREIGN KEY (`studioId`) REFERENCES `studios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_studioSlotId_fkey` FOREIGN KEY (`studioSlotId`) REFERENCES `studio_slots`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
