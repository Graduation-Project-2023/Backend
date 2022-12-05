/*
  Warnings:

  - You are about to drop the column `courseId` on the `program_courses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "program_courses" DROP CONSTRAINT "program_courses_courseId_fkey";

-- AlterTable
ALTER TABLE "program_courses" DROP COLUMN "courseId",
ALTER COLUMN "semester" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "program_courses" ADD CONSTRAINT "program_courses_code_fkey" FOREIGN KEY ("code") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
