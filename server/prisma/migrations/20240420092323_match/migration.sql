-- CreateTable
CREATE TABLE `Match` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `player1` VARCHAR(191) NOT NULL,
    `totalPointsplayer1` INTEGER NOT NULL,
    `player2` VARCHAR(191) NOT NULL,
    `totalPointsplayer2` INTEGER NOT NULL,
    `winner` VARCHAR(191) NOT NULL,
    `winningpoints` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Round` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `matchId` INTEGER NOT NULL,
    `player1choice` VARCHAR(191) NOT NULL,
    `player2choice` VARCHAR(191) NOT NULL,
    `player1score` VARCHAR(191) NOT NULL,
    `player2score` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Round` ADD CONSTRAINT `Round_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `Match`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
