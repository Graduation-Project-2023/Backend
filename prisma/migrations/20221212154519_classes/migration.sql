/*
  Warnings:

  - You are about to drop the column `lectureDay` on the `course_instances` table. All the data in the column will be lost.
  - You are about to drop the column `lectureEndPeriod` on the `course_instances` table. All the data in the column will be lost.
  - You are about to drop the column `lectureStartDate` on the `course_instances` table. All the data in the column will be lost.
  - You are about to drop the column `lectureStartPeriod` on the `course_instances` table. All the data in the column will be lost.
  - You are about to drop the column `sectionEndPeriod` on the `course_instances` table. All the data in the column will be lost.
  - You are about to drop the column `sectionStartDate` on the `course_instances` table. All the data in the column will be lost.
  - You are about to drop the column `sectionStartPeriod` on the `course_instances` table. All the data in the column will be lost.
  - You are about to drop the column `tableId` on the `course_instances` table. All the data in the column will be lost.
  - Added the required column `levelId` to the `course_instances` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ClassType" AS ENUM ('LECTURE', 'LAB', 'SECTION');

-- DropForeignKey
ALTER TABLE "course_instances" DROP CONSTRAINT "course_instances_professorId_fkey";

-- DropForeignKey
ALTER TABLE "course_instances" DROP CONSTRAINT "course_instances_tableId_fkey";

-- DropIndex
DROP INDEX "course_instances_tableId_idx";

-- AlterTable
ALTER TABLE "course_instances" DROP COLUMN "lectureDay",
DROP COLUMN "lectureEndPeriod",
DROP COLUMN "lectureStartDate",
DROP COLUMN "lectureStartPeriod",
DROP COLUMN "sectionEndPeriod",
DROP COLUMN "sectionStartDate",
DROP COLUMN "sectionStartPeriod",
DROP COLUMN "tableId",
ADD COLUMN     "levelId" TEXT NOT NULL,
ALTER COLUMN "professorId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "classes" (
    "id" TEXT NOT NULL,
    "courseInstanceId" TEXT NOT NULL,
    "groupId" TEXT,
    "professorId" TEXT,
    "tableId" TEXT NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "course_instances_levelId_idx" ON "course_instances" USING HASH ("levelId");

-- AddForeignKey
ALTER TABLE "course_instances" ADD CONSTRAINT "course_instances_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_instances" ADD CONSTRAINT "course_instances_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "course_tables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
