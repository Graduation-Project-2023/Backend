/*
  Warnings:

  - You are about to drop the column `courseCode` on the `courses` table. All the data in the column will be lost.
  - The primary key for the `grades` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `levelId` on the `level_allowed_hours` table. All the data in the column will be lost.
  - The primary key for the `levels` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `level` on the `program_courses` table. All the data in the column will be lost.
  - The required column `id` was added to the `grades` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `levels` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "program_courses" DROP CONSTRAINT "program_courses_code_fkey";

-- DropForeignKey
ALTER TABLE "program_courses" DROP CONSTRAINT "program_courses_programId_fkey";

-- DropForeignKey
ALTER TABLE "program_courses" DROP CONSTRAINT "program_courses_programId_level_fkey";

-- DropIndex
DROP INDEX "courses_courseCode_key";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "courseCode";

-- AlterTable
ALTER TABLE "grades" DROP CONSTRAINT "grades_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "grades_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "level_allowed_hours" DROP COLUMN "levelId";

-- AlterTable
ALTER TABLE "levels" DROP CONSTRAINT "levels_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "levels_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "program_courses" DROP COLUMN "level",
ADD COLUMN     "levelId" TEXT;

-- AddForeignKey
ALTER TABLE "program_courses" ADD CONSTRAINT "program_courses_code_fkey" FOREIGN KEY ("code") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_courses" ADD CONSTRAINT "program_courses_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_courses" ADD CONSTRAINT "program_courses_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "levels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
