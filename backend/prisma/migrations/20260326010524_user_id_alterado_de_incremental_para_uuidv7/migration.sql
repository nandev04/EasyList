/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Device` DROP FOREIGN KEY `Device_userId_fkey`;

-- DropForeignKey
ALTER TABLE `PasswordResetOTP` DROP FOREIGN KEY `PasswordResetOTP_userId_fkey`;

-- DropForeignKey
ALTER TABLE `PasswordResetToken` DROP FOREIGN KEY `PasswordResetToken_userId_fkey`;

-- DropForeignKey
ALTER TABLE `RefreshToken` DROP FOREIGN KEY `RefreshToken_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UpdateEmailOTP` DROP FOREIGN KEY `UpdateEmailOTP_userId_fkey`;

-- DropIndex
DROP INDEX `Device_userId_fkey` ON `Device`;

-- DropIndex
DROP INDEX `PasswordResetToken_userId_fkey` ON `PasswordResetToken`;

-- DropIndex
DROP INDEX `RefreshToken_userId_fkey` ON `RefreshToken`;

-- DropIndex
DROP INDEX `Task_userId_fkey` ON `Task`;

-- AlterTable
ALTER TABLE `Device` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `PasswordResetOTP` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `PasswordResetToken` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `RefreshToken` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Task` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `UpdateEmailOTP` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Device` ADD CONSTRAINT `Device_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PasswordResetOTP` ADD CONSTRAINT `PasswordResetOTP_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PasswordResetToken` ADD CONSTRAINT `PasswordResetToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UpdateEmailOTP` ADD CONSTRAINT `UpdateEmailOTP_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
