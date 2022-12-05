/*
  Warnings:

  - The primary key for the `grades` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `grades` table. All the data in the column will be lost.
  - The primary key for the `levels` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `levels` table. All the data in the column will be lost.
  - The primary key for the `program_courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `program_courses` table. All the data in the column will be lost.
  - You are about to drop the column `levelId` on the `program_courses` table. All the data in the column will be lost.
  - You are about to drop the column `prerequisiteId` on the `program_courses` table. All the data in the column will be lost.
  - Made the column `programId` on table `grades` required. This step will fail if there are existing NULL values in that column.
  - Made the column `programId` on table `levels` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `code` to the `program_courses` table without a default value. This is not possible if the table is not empty.
  - Made the column `courseId` on table `program_courses` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "grades" DROP CONSTRAINT "grades_programId_fkey";

-- DropForeignKey
ALTER TABLE "levels" DROP CONSTRAINT "levels_programId_fkey";

-- DropForeignKey
ALTER TABLE "program_courses" DROP CONSTRAINT "program_courses_courseId_fkey";

-- DropForeignKey
ALTER TABLE "program_courses" DROP CONSTRAINT "program_courses_levelId_fkey";

-- DropForeignKey
ALTER TABLE "program_courses" DROP CONSTRAINT "program_courses_prerequisiteId_fkey";

-- AlterTable
ALTER TABLE "grades" DROP CONSTRAINT "grades_pkey",
DROP COLUMN "id",
ALTER COLUMN "programId" SET NOT NULL,
ADD CONSTRAINT "grades_pkey" PRIMARY KEY ("programId", "gpa");

-- AlterTable
ALTER TABLE "levels" DROP CONSTRAINT "levels_pkey",
DROP COLUMN "id",
ALTER COLUMN "programId" SET NOT NULL,
ADD CONSTRAINT "levels_pkey" PRIMARY KEY ("programId", "level");

-- AlterTable
ALTER TABLE "program_courses" DROP CONSTRAINT "program_courses_pkey",
DROP COLUMN "id",
DROP COLUMN "levelId",
DROP COLUMN "prerequisiteId",
ADD COLUMN     "arabicName" TEXT,
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "englishName" TEXT,
ADD COLUMN     "level" INTEGER,
ALTER COLUMN "courseId" SET NOT NULL,
ADD CONSTRAINT "program_courses_pkey" PRIMARY KEY ("programId", "code");

-- AlterTable
ALTER TABLE "programs" ADD COLUMN     "maxGrade" INTEGER;

-- CreateTable
CREATE TABLE "prerequisites" (
    "programId" TEXT NOT NULL,
    "programCode" TEXT NOT NULL,
    "prerequisiteCode" TEXT NOT NULL,

    CONSTRAINT "prerequisites_pkey" PRIMARY KEY ("programCode","prerequisiteCode")
);

-- AddForeignKey
ALTER TABLE "program_courses" ADD CONSTRAINT "program_courses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_courses" ADD CONSTRAINT "program_courses_programId_level_fkey" FOREIGN KEY ("programId", "level") REFERENCES "levels"("programId", "level") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prerequisites" ADD CONSTRAINT "prerequisites_programCode_programId_fkey" FOREIGN KEY ("programCode", "programId") REFERENCES "program_courses"("code", "programId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prerequisites" ADD CONSTRAINT "prerequisites_prerequisiteCode_programId_fkey" FOREIGN KEY ("prerequisiteCode", "programId") REFERENCES "program_courses"("code", "programId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "levels" ADD CONSTRAINT "levels_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
