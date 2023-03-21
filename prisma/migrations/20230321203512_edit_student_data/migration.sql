/*
  Warnings:

  - You are about to drop the column `InstitutePreviousQualification` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `PreviousQualification` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `SeatId` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `TotalPreviousQualification` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[seatId]` on the table `students` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "students_SeatId_key";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "InstitutePreviousQualification",
DROP COLUMN "PreviousQualification",
DROP COLUMN "SeatId",
DROP COLUMN "TotalPreviousQualification",
ADD COLUMN     "institutePreviousQualification" TEXT,
ADD COLUMN     "previousQualification" TEXT,
ADD COLUMN     "seatId" SERIAL,
ADD COLUMN     "totalPreviousQualification" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "students_seatId_key" ON "students"("seatId");
