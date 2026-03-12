-- DropForeignKey
ALTER TABLE `PasswordResetOTP` DROP FOREIGN KEY `PasswordResetOTP_userId_fkey`;

-- DropIndex
DROP INDEX `PasswordResetOTP_userId_expiresAt_id_idx` ON `PasswordResetOTP`;

-- CreateIndex
CREATE INDEX `Device_createdAt_idx` ON `Device`(`createdAt`);

-- CreateIndex
CREATE INDEX `PasswordResetOTP_userId_used_expiresAt_id_idx` ON `PasswordResetOTP`(`userId`, `used`, `expiresAt`, `id`);

-- CreateIndex
CREATE INDEX `RefreshToken_expiresAt_idx` ON `RefreshToken`(`expiresAt`);

