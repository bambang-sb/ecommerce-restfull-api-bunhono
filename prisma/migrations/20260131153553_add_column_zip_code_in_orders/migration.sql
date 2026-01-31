/*
  Warnings:

  - Added the required column `zipCode` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `zipCode` VARCHAR(191) NOT NULL;
