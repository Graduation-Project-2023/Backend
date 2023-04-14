/*
  Warnings:

  - You are about to drop the column `marks` on the `sheet_instances` table. All the data in the column will be lost.
  - The `startTime` column on the `sheet_instances` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `endTime` column on the `sheet_instances` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "sheet_instances" DROP COLUMN "marks",
ADD COLUMN     "finished" BOOLEAN DEFAULT false,
ADD COLUMN     "result" DOUBLE PRECISION,
ALTER COLUMN "answers" DROP NOT NULL,
DROP COLUMN "startTime",
ADD COLUMN     "startTime" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "endTime",
ADD COLUMN     "endTime" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
