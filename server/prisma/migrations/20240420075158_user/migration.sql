/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `player_id` on the `user` table. All the data in the column will be lost.
  - Added the required column `match_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `player_id`,
    ADD COLUMN `match_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`match_id`);
