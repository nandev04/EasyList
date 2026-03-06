/*
  Warnings:

  - Added the required column `new_email` to the `UpdateEmailOTP` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UpdateEmailOTP` ADD COLUMN `new_email` VARCHAR(191) NOT NULL;
