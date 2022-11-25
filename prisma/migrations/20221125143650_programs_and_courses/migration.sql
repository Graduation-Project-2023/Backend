/*
  Warnings:

  - You are about to drop the column `branchId` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `departmentId` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `semester` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `unlockedCourseId` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `departmentId` on the `students` table. All the data in the column will be lost.
  - You are about to drop the `branches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `classes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `courses_grades` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `departments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `professors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `student_classes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `arabicDescription` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `englishDescription` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collegeId` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programId` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "System" AS ENUM ('CREDIT', 'SCHOOLYEAR');

-- CreateEnum
CREATE TYPE "AllowedHrs" AS ENUM ('SEMESTER', 'CUMULATIVE', 'INCLUDESUMMER');

-- CreateEnum
CREATE TYPE "FeesType" AS ENUM ('YEARFIXED', 'SEMESTERFIXED', 'CREDITHOURS', 'COURSES');

-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('COMPULSORY', 'ELECTIVE');

-- DropForeignKey
ALTER TABLE "branches" DROP CONSTRAINT "branches_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "classes" DROP CONSTRAINT "classes_courseId_fkey";

-- DropForeignKey
ALTER TABLE "classes" DROP CONSTRAINT "classes_professorId_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_branchId_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_unlockedCourseId_fkey";

-- DropForeignKey
ALTER TABLE "courses_grades" DROP CONSTRAINT "courses_grades_courseId_fkey";

-- DropForeignKey
ALTER TABLE "courses_grades" DROP CONSTRAINT "courses_grades_studentId_fkey";

-- DropForeignKey
ALTER TABLE "professors" DROP CONSTRAINT "professors_branchId_fkey";

-- DropForeignKey
ALTER TABLE "professors" DROP CONSTRAINT "professors_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "professors" DROP CONSTRAINT "professors_userId_fkey";

-- DropForeignKey
ALTER TABLE "student_classes" DROP CONSTRAINT "student_classes_classId_fkey";

-- DropForeignKey
ALTER TABLE "student_classes" DROP CONSTRAINT "student_classes_studentId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_branchId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_departmentId_fkey";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "branchId",
DROP COLUMN "departmentId",
DROP COLUMN "level",
DROP COLUMN "semester",
DROP COLUMN "unlockedCourseId",
ADD COLUMN     "arabicDescription" TEXT NOT NULL,
ADD COLUMN     "collegeId" TEXT,
ADD COLUMN     "englishDescription" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "branchId",
DROP COLUMN "departmentId",
ADD COLUMN     "collegeId" TEXT NOT NULL,
ADD COLUMN     "programId" TEXT NOT NULL;

-- DropTable
DROP TABLE "branches";

-- DropTable
DROP TABLE "classes";

-- DropTable
DROP TABLE "courses_grades";

-- DropTable
DROP TABLE "departments";

-- DropTable
DROP TABLE "professors";

-- DropTable
DROP TABLE "student_classes";

-- DropEnum
DROP TYPE "Grade";

-- DropEnum
DROP TYPE "Level";

-- CreateTable
CREATE TABLE "colleges" (
    "id" TEXT NOT NULL,
    "englishName" TEXT NOT NULL,
    "arabicName" TEXT NOT NULL,

    CONSTRAINT "colleges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "program_courses" (
    "id" TEXT NOT NULL,
    "programId" TEXT,
    "courseId" TEXT,
    "levelId" TEXT,
    "prerequisiteId" TEXT,
    "semester" "Semester" NOT NULL,
    "creditHours" INTEGER NOT NULL,
    "minimumHrsToRegister" INTEGER,
    "courseType" "CourseType" NOT NULL,
    "classWork" INTEGER,
    "finalExam" INTEGER,
    "midTerm" INTEGER,
    "oralPractical" INTEGER,
    "attendance" INTEGER,

    CONSTRAINT "program_courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "levels" (
    "id" TEXT NOT NULL,
    "englishName" TEXT NOT NULL,
    "arabicName" TEXT NOT NULL,
    "programId" TEXT,
    "level" INTEGER NOT NULL,
    "qualifyingHrs" INTEGER NOT NULL,

    CONSTRAINT "levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grades" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startsFrom" INTEGER NOT NULL,
    "endsAt" INTEGER NOT NULL,
    "equivalent" TEXT NOT NULL,
    "gpa" DOUBLE PRECISION NOT NULL,
    "programId" TEXT,

    CONSTRAINT "grades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programs" (
    "id" TEXT NOT NULL,
    "englishName" TEXT NOT NULL,
    "arabicName" TEXT NOT NULL,
    "collegeId" TEXT NOT NULL,
    "programCode" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "creditHours" INTEGER NOT NULL,
    "mandatoryHours" INTEGER,
    "optionalHours" INTEGER,
    "projectQualifyingHours" INTEGER,
    "feesType" "FeesType" NOT NULL,
    "summerFeesType" "FeesType" NOT NULL,
    "allowedHrs" "AllowedHrs" NOT NULL,
    "prerequisiteProgramId" TEXT,
    "gradeLowering" INTEGER,
    "attemptsToLowerGrade" INTEGER,
    "failureGrade" INTEGER,

    CONSTRAINT "programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "level_allowed_hours" (
    "id" TEXT NOT NULL,
    "programId" TEXT,
    "semester" "Semester" NOT NULL,
    "level" INTEGER NOT NULL,
    "levelId" TEXT NOT NULL,
    "minHours" INTEGER NOT NULL,
    "maxHours" INTEGER NOT NULL,
    "maxCourses" INTEGER NOT NULL,

    CONSTRAINT "level_allowed_hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gpa_allowed_hours" (
    "id" TEXT NOT NULL,
    "programId" TEXT,
    "fromGpa" DOUBLE PRECISION NOT NULL,
    "toGpa" DOUBLE PRECISION NOT NULL,
    "minHours" INTEGER NOT NULL,
    "maxHours" INTEGER NOT NULL,
    "maxCourses" INTEGER NOT NULL,

    CONSTRAINT "gpa_allowed_hours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "programs_programCode_key" ON "programs"("programCode");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "colleges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "colleges"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_courses" ADD CONSTRAINT "program_courses_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_courses" ADD CONSTRAINT "program_courses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_courses" ADD CONSTRAINT "program_courses_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "levels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_courses" ADD CONSTRAINT "program_courses_prerequisiteId_fkey" FOREIGN KEY ("prerequisiteId") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "levels" ADD CONSTRAINT "levels_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programs" ADD CONSTRAINT "programs_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "colleges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programs" ADD CONSTRAINT "programs_prerequisiteProgramId_fkey" FOREIGN KEY ("prerequisiteProgramId") REFERENCES "programs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "level_allowed_hours" ADD CONSTRAINT "level_allowed_hours_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gpa_allowed_hours" ADD CONSTRAINT "gpa_allowed_hours_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
