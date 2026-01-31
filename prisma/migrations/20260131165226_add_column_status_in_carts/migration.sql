-- AlterTable
ALTER TABLE `carts` ADD COLUMN `status` ENUM('null', 'checkout') NOT NULL DEFAULT 'null';
