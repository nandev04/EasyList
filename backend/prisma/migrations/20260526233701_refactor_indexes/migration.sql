-- DropIndex
DROP INDEX "Device_createdAt_idx";

-- DropIndex
DROP INDEX "PasswordResetOTP_userId_used_expiresAt_id_idx";

-- DropIndex
DROP INDEX "RefreshToken_expiresAt_idx";

-- DropIndex
DROP INDEX "UpdateEmailOTP_userId_tokenHash_expiresAt_used_idx";

-- CreateIndex
CREATE INDEX "PasswordResetOTP_userId_tokenHash_idx" ON "PasswordResetOTP"("userId", "tokenHash");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE INDEX "RefreshToken_deviceId_idx" ON "RefreshToken"("deviceId");

-- CreateIndex
CREATE INDEX "UpdateEmailOTP_userId_tokenHash_idx" ON "UpdateEmailOTP"("userId", "tokenHash");
