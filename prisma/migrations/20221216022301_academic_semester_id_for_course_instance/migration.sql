/*
  Warnings:

  - You are about to drop the column `courseId` on the `course_instances` table. All the data in the column will be lost.
  - You are about to drop the column `semesterId` on the `course_instances` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[programCourseId,academicSemesterId]` on the table `course_instances` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `academicSemesterId` to the `course_instances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programCourseId` to the `course_instances` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "course_instances" DROP CONSTRAINT "course_instances_courseId_fkey";

-- DropForeignKey
ALTER TABLE "course_instances" DROP CONSTRAINT "course_instances_levelId_fkey";

-- DropForeignKey
ALTER TABLE "course_instances" DROP CONSTRAINT "course_instances_semesterId_fkey";

-- DropIndex
DROP INDEX "course_instances_courseId_semesterId_key";

-- AlterTable
ALTER TABLE "course_instances" DROP COLUMN "courseId",
DROP COLUMN "semesterId",
ADD COLUMN     "academicSemesterId" TEXT NOT NULL,
ADD COLUMN     "programCourseId" TEXT NOT NULL,
ALTER COLUMN "englishName" DROP NOT NULL,
ALTER COLUMN "arabicName" DROP NOT NULL,
ALTER COLUMN "levelId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "student_course_instances" ALTER COLUMN "englishName" DROP NOT NULL,
ALTER COLUMN "arabicName" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "course_instances_programCourseId_academicSemesterId_key" ON "course_instances"("programCourseId", "academicSemesterId");

-- AddForeignKey
ALTER TABLE "course_instances" ADD CONSTRAINT "course_instances_programCourseId_fkey" FOREIGN KEY ("programCourseId") REFERENCES "program_courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_instances" ADD CONSTRAINT "course_instances_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "levels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_instances" ADD CONSTRAINT "course_instances_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "academic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
