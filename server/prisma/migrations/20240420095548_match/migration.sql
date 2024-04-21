/*
  Warnings:

  - Added the required column `round` to the `Round` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `round` ADD COLUMN `round` INTEGER NOT NULL;
