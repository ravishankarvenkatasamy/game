-- CreateTable
CREATE TABLE `User` (
    `player_id` INTEGER NOT NULL AUTO_INCREMENT,
    `player1` VARCHAR(191) NOT NULL,
    `totalPointsplayer1` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_totalPointsplayer1_key`(`totalPointsplayer1`),
    PRIMARY KEY (`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
