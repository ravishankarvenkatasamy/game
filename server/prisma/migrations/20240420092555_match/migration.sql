/*
  Warnings:

  - You are about to drop the column `winningpoints` on the `match` table. All the data in the column will be lost.
  - Added the required column `winningpoint` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `match` DROP COLUMN `winningpoints`,
    ADD COLUMN `winningpoint` INTEGER NOT NULL;
