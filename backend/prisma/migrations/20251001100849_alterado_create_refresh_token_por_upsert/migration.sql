/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `RefreshToken_userId_key` ON `RefreshToken`(`userId`);
ALTER TABLE RefreshToken
ADD COLUMN deviceId VARCHAR(255) NOT NULL UNIQUE;

