/*
  Warnings:

  - The primary key for the `program_courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `prerequisites` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `program_courses` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterEnum
ALTER TYPE "AllowedHrs" ADD VALUE 'SEMESTERFIXED';

-- DropForeignKey
ALTER TABLE "prerequisites" DROP CONSTRAINT "prerequisites_courseCode_programId_fkey";

-- DropForeignKey
ALTER TABLE "prerequisites" DROP CONSTRAINT "prerequisites_prerequisiteCode_programId_fkey";

-- AlterTable
ALTER TABLE "program_courses" DROP CONSTRAINT "program_courses_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "program_courses_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "prerequisites";

-- CreateTable
CREATE TABLE "_CoursePrerequisites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoursePrerequisites_AB_unique" ON "_CoursePrerequisites"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursePrerequisites_B_index" ON "_CoursePrerequisites"("B");

-- AddForeignKey
ALTER TABLE "_CoursePrerequisites" ADD CONSTRAINT "_CoursePrerequisites_A_fkey" FOREIGN KEY ("A") REFERENCES "program_courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursePrerequisites" ADD CONSTRAINT "_CoursePrerequisites_B_fkey" FOREIGN KEY ("B") REFERENCES "program_courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
