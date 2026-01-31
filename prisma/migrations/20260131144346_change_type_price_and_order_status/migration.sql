/*
  Warnings:

  - You are about to alter the column `orderStatus` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `orders` MODIFY `totalPrice` INTEGER NOT NULL,
    MODIFY `orderStatus` ENUM('pending', 'paid', 'process', 'shiped', 'delivered', 'complete', 'cancel') NOT NULL;
