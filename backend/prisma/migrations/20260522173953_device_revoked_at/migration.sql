-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "revokedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Task_userId_status_idx" ON "Task"("userId", "status");
