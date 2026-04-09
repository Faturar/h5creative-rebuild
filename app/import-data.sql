-- Complete sample data for Live Booking System
-- This file contains sample records for all tables in h5cr_main database

USE h5cr_main;

-- Disable foreign key checks during import to handle dependencies
SET FOREIGN_KEY_CHECKS = 0;

-- Insert sample packages
INSERT INTO `packages` (`id`, `name`, `description`, `price`, `promoPrice`, `durationMinutes`, `platform`, `includesHost`, `includesStudio`, `includesDevice`, `isActive`, `createdAt`, `updatedAt`) VALUES
	('86c285f2-2094-4193-b111-412f14e3060f', 'TikTok Live Starter Package', 'Perfect package for beginners starting their TikTok live journey. Includes basic setup and 2-hour live session.', 1200000.00, 1000000.00, 120, 'TikTok', 1, 1, 1, 1, '2026-04-01 00:00:00', '2026-04-01 00:00:00'),
	('ef2ee3ba-e1ef-4e34-93b8-826f5d0add76', 'Shopee Live Pro Package', 'Professional live streaming package for Shopee sellers. Enhanced production quality and extended duration.', 2500000.00, NULL, 180, 'Shopee', 1, 1, 1, 1, '2026-04-01 00:00:00', '2026-04-01 00:00:00'),
	('45f9c8d2-1a3f-4b7e-9c6a-2d5e8f1b3c4d', 'Instagram Live Premium', 'Premium Instagram live streaming experience with full production support.', 3500000.00, 2800000.00, 240, 'Instagram', 1, 1, 1, 1, '2026-04-01 00:00:00', '2026-04-01 00:00:00'),
	('7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d', 'Tokopedia Mega Live', 'Mega live streaming event for Tokopedia with maximum exposure and engagement.', 5000000.00, NULL, 300, 'Tokopedia', 1, 1, 1, 1, '2026-04-01 00:00:00', '2026-04-01 00:00:00');

-- Insert sample hosts
INSERT INTO `hosts` (`id`, `name`, `bio`, `photoUrl`, `portfolioUrl`, `expertise`, `rating`, `totalStreams`, `languages`, `socialMediaLinks`, `isActive`, `createdAt`, `updatedAt`) VALUES
	('f630f204-ecec-4ecf-82c8-49347dac17ef', 'Sarah Wijaya', 'Professional live streamer with 5+ years experience. Specialized in beauty and fashion content.', 'https://example.com/photos/sarah.jpg', 'https://portfolio.sarah.live', 'Beauty', 4.8, 250, 'Indonesian, English', '{"tiktok": "@sarahbeauty", "instagram": "@sarah.live"}', 1, '2026-04-01 00:00:00', '2026-04-01 00:00:00'),
	('f70148d4-8d1c-4272-88df-bef43b5f3831', 'Budi Santoso', 'Tech enthusiast and gadget reviewer. Expert in product launches and tech demonstrations.', 'https://example.com/photos/budi.jpg', 'https://budi.tech/portfolio', 'Tech', 4.9, 180, 'Indonesian, English', '{"youtube": "@buditech", "tiktok": "@budireviews"}', 1, '2026-04-01 00:00:00', '2026-04-01 00:00:00'),
	('a2b3c4d5-e6f7-8a9b-0c1d-2e3f4a5b6c7d', 'Anita Putri', 'Food and beverage specialist. Former chef with passion for culinary content creation.', 'https://example.com/photos/anita.jpg', 'https://anita.food/portfolio', 'F&B', 4.7, 200, 'Indonesian', '{"instagram": "@anitafood", "tiktok": "@anitacooks"}', 1, '2026-04-01 00:00:00', '2026-04-01 00:00:00'),
	('8f9e0d1c-2a3b-4c5d-6e7f-8a9b0c1d2e3f', 'David Gunawan', 'Fashion and lifestyle influencer. Expert in fashion shows and brand promotions.', 'https://example.com/photos/david.jpg', 'https://david.style/portfolio', 'Fashion', 4.6, 150, 'Indonesian, English', '{"instagram": "@davidstyle", "youtube": "@davidfashion"}', 1, '2026-04-01 00:00:00', '2026-04-01 00:00:00');

-- Insert sample studios
INSERT INTO `studios` (`id`, `name`, `location`, `description`, `photoUrl`, `capacity`, `equipment`, `amenities`, `isActive`, `createdAt`, `updatedAt`) VALUES
	('40ebb451-ac83-4f05-ac52-35306b56af4d', 'Studio A - Jakarta Central', 'Jakarta Selatan, Indonesia', 'Professional live streaming studio with 4K camera setup and professional lighting.', 'https://example.com/studios/studio-a.jpg', 6, '["Camera Sony A7III", "Professional Lighting", "Green Screen", "Audio Equipment"]', '["WiFi", "AC", "Makeup Room", "Snack Bar"]', 1, '2026-04-01 00:00:00', '2026-04-01 00:00:00'),
	('503feeec-69fa-4c1d-a819-fa0bb5a10391', 'Studio B - Bandung Creative', 'Bandung, Indonesia', 'Creative studio space with modern equipment and versatile shooting angles.', 'https://example.com/studios/studio-b.jpg', 4, '["Camera Canon R5", "Ring Lights", "Backdrop System", "Wireless Microphones"]', '["WiFi", "AC", "Green Room", "Parking"]', 1, '2026-04-01 00:00:00', '2026-04-01 00:00:00'),
	('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'Studio C - Surabaya Premium', 'Surabaya, Indonesia', 'Premium studio with state-of-the-art equipment and professional staff.', 'https://example.com/studios/studio-c.jpg', 8, '["Camera RED", "Professional Lighting", "Teleprompter", "Multi-camera Setup"]', '["WiFi", "AC", "VIP Room", "Catering", "Technical Support"]', 1, '2026-04-01 00:00:00', '2026-04-01 00:00:00');

-- Insert sample studio slots
INSERT INTO `studio_slots` (`id`, `studioId`, `date`, `startTime`, `endTime`, `isBooked`, `createdAt`, `booking`) VALUES
	('27f02799-65fd-43e9-a8d7-9e2324873a99', '40ebb451-ac83-4f05-ac52-35306b56af4d', '2026-04-03 00:00:00', '17:00', '19:00', 1, '2026-04-01 00:00:00', '03ad2d14-70be-4af1-864e-5f19207afad5'),
	('987b1cb8-77e6-4997-a0b1-c2d3e4f5a6b7', '503feeec-69fa-4c1d-a819-fa0bb5a10391', '2026-04-03 00:00:00', '17:00', '19:00', 1, '2026-04-01 00:00:00', '12f15d4a-b0ab-459f-b9c8-99f9b52efad6'),
	('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', '40ebb451-ac83-4f05-ac52-35306b56af4d', '2026-04-04 00:00:00', '09:00', '11:00', 0, '2026-04-01 00:00:00', NULL),
	('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', '40ebb451-ac83-4f05-ac52-35306b56af4d', '2026-04-04 00:00:00', '13:00', '15:00', 0, '2026-04-01 00:00:00', NULL),
	('c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', '503feeec-69fa-4c1d-a819-fa0bb5a10391', '2026-04-05 00:00:00', '10:00', '12:00', 0, '2026-04-01 00:00:00', NULL);

-- Link packages with hosts
INSERT INTO `package_hosts` (`id`, `packageId`, `hostId`) VALUES
	('package-host-1', '86c285f2-2094-4193-b111-412f14e3060f', 'f630f204-ecec-4ecf-82c8-49347dac17ef'),
	('package-host-2', 'ef2ee3ba-e1ef-4e34-93b8-826f5d0add76', 'f70148d4-8d1c-4272-88df-bef43b5f3831'),
	('package-host-3', '45f9c8d2-1a3f-4b7e-9c6a-2d5e8f1b3c4d', 'a2b3c4d5-e6f7-8a9b-0c1d-2e3f4a5b6c7d'),
	('package-host-4', '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d', '8f9e0d1c-2a3b-4c5d-6e7f-8a9b0c1d2e3f');

-- Insert sample bookings
INSERT INTO `bookings` (`id`, `bookingCode`, `packageId`, `hostId`, `studioId`, `studioSlotId`, `date`, `startTime`, `endTime`, `customerName`, `customerPhone`, `customerEmail`, `businessName`, `productCategory`, `price`, `status`, `notes`, `createdAt`, `updatedAt`) VALUES
	('03ad2d14-70be-4af1-864e-5f19207afad5', 'BK31439538', '86c285f2-2094-4193-b111-412f14e3060f', 'f630f204-ecec-4ecf-82c8-49347dac17ef', '40ebb451-ac83-4f05-ac52-35306b56af4d', '27f02799-65fd-43e9-a8d7-9e2324873a99', '2026-04-03 00:00:00', '17:00', '19:00', 'Fatur Ardiansyah Ramadha', '08129175480', 'faturardiansyah122@gmail.com', 'Tasty Bites', 'Food & Beverage', 1200000.00, 'PENDING', 'Please include product demonstration segment', '2026-04-03 15:50:39.894', '2026-04-03 15:50:39.894'),
	('12f15d4a-b0ab-459f-b9c8-99f9b52efad6', 'BK22313920', 'ef2ee3ba-e1ef-4e34-93b8-826f5d0add76', 'f70148d4-8d1c-4272-88df-bef43b5f3831', '503feeec-69fa-4c1d-a819-fa0bb5a10391', '987b1cb8-77e6-4997-a0b1-c2d3e4f5a6b7', '2026-04-03 00:00:00', '17:00', '19:00', 'Fatur Ardiansyah Ramadha', '08129175480', 'faturardiansyah122@gmail.com', 'Tech Gadgets ID', 'Technology', 2500000.00, 'PENDING', 'Focus on product features and benefits', '2026-04-03 15:50:39.894', '2026-04-03 15:50:39.894'),
	('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'BK44559382', '45f9c8d2-1a3f-4b7e-9c6a-2d5e8f1b3c4d', 'a2b3c4d5-e6f7-8a9b-0c1d-2e3f4a5b6c7d', '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', '2026-04-04 00:00:00', '09:00', '11:00', 'Siti Rahayu', '085712345678', 'siti.rahayu@email.com', 'Cuisine Art', 'Food & Beverage', 2800000.00, 'PAID', 'Need recipe demonstration segment', '2026-04-04 08:30:00.000', '2026-04-04 08:30:00.000'),
	('2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e', 'BK55669493', '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d', '8f9e0d1c-2a3b-4c5d-6e7f-8a9b0c1d2e3f', '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', '2026-04-04 00:00:00', '13:00', '15:00', 'Andi Pratama', '081234567890', 'andi.pratama@email.com', 'Fashion Forward', 'Fashion', 5000000.00, 'COMPLETED', 'Fashion show with multiple models', '2026-04-04 12:30:00.000', '2026-04-04 15:00:00.000'),
	('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'BK66779514', '86c285f2-2094-4193-b111-412f14e3060f', 'f630f204-ecec-4ecf-82c8-49347dac17ef', '40ebb451-ac83-4f05-ac52-35306b56af4d', 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', '2026-04-05 00:00:00', '10:00', '12:00', 'Maya Sari', '085678901234', 'maya.sari@email.com', 'Beauty Glow', 'Beauty', 1000000.00, 'PENDING', 'Makeup tutorial session', '2026-04-05 09:45:00.000', '2026-04-05 09:45:00.000');

-- Insert sample payments
INSERT INTO `payments` (`id`, `bookingId`, `paymentGateway`, `transactionId`, `amount`, `status`, `paidAt`, `rawResponse`, `createdAt`) VALUES
	('payment-1', '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'midtrans', 'MTX-2026-04-04-001', 2800000.00, 'SUCCESS', '2026-04-04 08:35:00.000', '{"status_code": "200", "transaction_status": "capture"}', '2026-04-04 08:35:00.000'),
	('payment-2', '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e', 'midtrans', 'MTX-2026-04-04-002', 5000000.00, 'SUCCESS', '2026-04-04 12:32:00.000', '{"status_code": "200", "transaction_status": "capture"}', '2026-04-04 12:32:00.000'),
	('payment-3', '03ad2d14-70be-4af1-864e-5f19207afad5', 'midtrans', 'MTX-2026-04-03-003', 1200000.00, 'PENDING', NULL, '{"status_code": "201", "transaction_status": "pending"}', '2026-04-03 15:52:00.000'),
	('payment-4', '12f15d4a-b0ab-459f-b9c8-99f9b52efad6', 'midtrans', 'MTX-2026-04-03-004', 2500000.00, 'PENDING', NULL, '{"status_code": "201", "transaction_status": "pending"}', '2026-04-03 15:52:00.000'),
	('payment-5', '3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'midtrans', 'MTX-2026-04-05-005', 1000000.00, 'PENDING', NULL, '{"status_code": "201", "transaction_status": "pending"}', '2026-04-05 09:46:00.000');

-- Re-enable foreign key checks after import
SET FOREIGN_KEY_CHECKS = 1;

-- Verify data import
SELECT 'Import completed successfully!' as Status;
SELECT COUNT(*) as PackageCount FROM packages;
SELECT COUNT(*) as HostCount FROM hosts;
SELECT COUNT(*) as StudioCount FROM studios;
SELECT COUNT(*) as BookingCount FROM bookings;
SELECT COUNT(*) as PaymentCount FROM payments;
