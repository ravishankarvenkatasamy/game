/*
  Warnings:

  - You are about to alter the column `totalPointsplayer1` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `player2` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPointsplayer2` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `winner` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `winningpoints` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_totalPointsplayer1_key` ON `user`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `player2` VARCHAR(191) NOT NULL,
    ADD COLUMN `totalPointsplayer2` INTEGER NOT NULL,
    ADD COLUMN `winner` VARCHAR(191) NOT NULL,
    ADD COLUMN `winningpoints` INTEGER NOT NULL,
    MODIFY `totalPointsplayer1` INTEGER NOT NULL;
