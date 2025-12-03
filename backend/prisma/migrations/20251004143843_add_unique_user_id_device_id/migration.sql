/*
  Warnings:

  - You are about to alter the column `deviceId` on the `RefreshToken` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - A unique constraint covering the columns `[userId,deviceId]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `RefreshToken` DROP FOREIGN KEY `RefreshToken_userId_fkey`;

-- DropIndex
DROP INDEX `RefreshToken_userId_key` ON `RefreshToken`;

-- AlterTable
ALTER TABLE `RefreshToken` MODIFY `deviceId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `RefreshToken_userId_deviceId_key` ON `RefreshToken`(`userId`, `deviceId`);

-- RenameIndex
ALTER TABLE `RefreshToken` RENAME INDEX `deviceId` TO `RefreshToken_deviceId_key`;
