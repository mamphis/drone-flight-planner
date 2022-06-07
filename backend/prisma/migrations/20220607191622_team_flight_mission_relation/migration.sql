/*
  Warnings:

  - Added the required column `teamId` to the `FlightMission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FlightMission` ADD COLUMN `teamId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `FlightMission` ADD CONSTRAINT `FlightMission_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
