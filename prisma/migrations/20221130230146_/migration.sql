/*
  Warnings:

  - Made the column `programId` on table `program_courses` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "program_courses" DROP CONSTRAINT "program_courses_programId_fkey";

-- AlterTable
ALTER TABLE "program_courses" ALTER COLUMN "programId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "program_courses" ADD CONSTRAINT "program_courses_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
