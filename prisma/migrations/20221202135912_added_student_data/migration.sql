/*
  Warnings:

  - A unique constraint covering the columns `[SeatId]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `InstitutePreviousQualification` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PreviousQualification` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TotalPreviousQualification` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collegeCode` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `directorate` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enrollmentYear` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolMarks` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolSeatId` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "students" ADD COLUMN     "InstitutePreviousQualification" TEXT NOT NULL,
ADD COLUMN     "PreviousQualification" TEXT NOT NULL,
ADD COLUMN     "SeatId" SERIAL NOT NULL,
ADD COLUMN     "TotalPreviousQualification" TEXT NOT NULL,
ADD COLUMN     "collegeCode" TEXT NOT NULL,
ADD COLUMN     "directorate" TEXT NOT NULL,
ADD COLUMN     "enrollmentYear" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "schoolMarks" TEXT NOT NULL,
ADD COLUMN     "schoolSeatId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "students_SeatId_key" ON "students"("SeatId");
