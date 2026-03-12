-- DropForeignKey
ALTER TABLE `UpdateEmailOTP` DROP FOREIGN KEY `UpdateEmailOTP_userId_fkey`;

-- DropIndex
DROP INDEX `UpdateEmailOTP_userId_expiresAt_id_idx` ON `UpdateEmailOTP`;

-- CreateIndex
CREATE INDEX `UpdateEmailOTP_userId_tokenHash_idx` ON `UpdateEmailOTP`(`userId`, `tokenHash`);

-- AddForeignKey
ALTER TABLE `UpdateEmailOTP` ADD CONSTRAINT `UpdateEmailOTP_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
