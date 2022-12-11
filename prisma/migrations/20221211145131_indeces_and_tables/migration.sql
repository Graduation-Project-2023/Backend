/*
  Warnings:

  - A unique constraint covering the columns `[programId,name]` on the table `grades` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[programId,level]` on the table `levels` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[programId,code]` on the table `program_courses` will be added. If there are existing duplicate values, this will fail.
  - Made the column `programId` on table `level_allowed_hours` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Day" AS ENUM ('SATURDAY', 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY');

-- DropForeignKey
ALTER TABLE "level_allowed_hours" DROP CONSTRAINT "level_allowed_hours_programId_fkey";

-- AlterTable
ALTER TABLE "level_allowed_hours" ALTER COLUMN "programId" SET NOT NULL;

-- AlterTable
ALTER TABLE "programs" ADD COLUMN     "periodLength" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "enrollmentSemesterId" TEXT;

-- CreateTable
CREATE TABLE "professors" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "englishName" TEXT NOT NULL,
    "arabicName" TEXT NOT NULL,
    "collegeId" TEXT NOT NULL,

    CONSTRAINT "professors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_course_instances" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "instanceId" TEXT NOT NULL,
    "englishName" TEXT NOT NULL,
    "arabicName" TEXT NOT NULL,
    "lectureDay" "Day" NOT NULL,
    "lectureStartPeriod" INTEGER NOT NULL,
    "lectureStartDate" TIMESTAMP(3) NOT NULL,
    "lectureEndPeriod" INTEGER NOT NULL,
    "sectionStartPeriod" INTEGER,
    "sectionStartDate" TIMESTAMP(3),
    "sectionEndPeriod" INTEGER,
    "tableId" TEXT NOT NULL,
    "finished" BOOLEAN NOT NULL,
    "midtermScore" INTEGER,
    "classworkScore" INTEGER,
    "finalScore" INTEGER,
    "gradeId" TEXT,
    "studentTableId" TEXT,

    CONSTRAINT "student_course_instances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_tables" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "programId" TEXT NOT NULL,

    CONSTRAINT "student_tables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_instances" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "englishName" TEXT NOT NULL,
    "arabicName" TEXT NOT NULL,
    "lectureDay" "Day" NOT NULL,
    "lectureStartPeriod" INTEGER NOT NULL,
    "lectureStartDate" TIMESTAMP(3) NOT NULL,
    "lectureEndPeriod" INTEGER NOT NULL,
    "sectionStartPeriod" INTEGER,
    "sectionStartDate" TIMESTAMP(3),
    "sectionEndPeriod" INTEGER,

    CONSTRAINT "course_instances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_tables" (
    "id" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "programId" TEXT NOT NULL,

    CONSTRAINT "course_tables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_semesters" (
    "id" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "semester" "Semester" NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),

    CONSTRAINT "academic_semesters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "professors_userId_key" ON "professors"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "student_course_instances_studentId_instanceId_key" ON "student_course_instances"("studentId", "instanceId");

-- CreateIndex
CREATE INDEX "student_tables_programId_idx" ON "student_tables" USING HASH ("programId");

-- CreateIndex
CREATE UNIQUE INDEX "student_tables_levelId_semesterId_key" ON "student_tables"("levelId", "semesterId");

-- CreateIndex
CREATE INDEX "course_instances_tableId_idx" ON "course_instances" USING HASH ("tableId");

-- CreateIndex
CREATE UNIQUE INDEX "course_instances_courseId_semesterId_key" ON "course_instances"("courseId", "semesterId");

-- CreateIndex
CREATE INDEX "course_tables_programId_idx" ON "course_tables" USING HASH ("programId");

-- CreateIndex
CREATE UNIQUE INDEX "course_tables_levelId_semesterId_key" ON "course_tables"("levelId", "semesterId");

-- CreateIndex
CREATE UNIQUE INDEX "academic_semesters_academicYear_semester_key" ON "academic_semesters"("academicYear", "semester");

-- CreateIndex
CREATE INDEX "gpa_allowed_hours_programId_idx" ON "gpa_allowed_hours" USING HASH ("programId");

-- CreateIndex
CREATE INDEX "grades_programId_idx" ON "grades" USING HASH ("programId");

-- CreateIndex
CREATE UNIQUE INDEX "grades_programId_name_key" ON "grades"("programId", "name");

-- CreateIndex
CREATE INDEX "level_allowed_hours_programId_idx" ON "level_allowed_hours" USING HASH ("programId");

-- CreateIndex
CREATE UNIQUE INDEX "levels_programId_level_key" ON "levels"("programId", "level");

-- CreateIndex
CREATE INDEX "program_courses_programId_idx" ON "program_courses" USING HASH ("programId");

-- CreateIndex
CREATE UNIQUE INDEX "program_courses_programId_code_key" ON "program_courses"("programId", "code");

-- AddForeignKey
ALTER TABLE "professors" ADD CONSTRAINT "professors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professors" ADD CONSTRAINT "professors_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "colleges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_enrollmentSemesterId_fkey" FOREIGN KEY ("enrollmentSemesterId") REFERENCES "academic_semesters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_course_instances" ADD CONSTRAINT "student_course_instances_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_course_instances" ADD CONSTRAINT "student_course_instances_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "course_instances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_course_instances" ADD CONSTRAINT "student_course_instances_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "grades"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_course_instances" ADD CONSTRAINT "student_course_instances_studentTableId_fkey" FOREIGN KEY ("studentTableId") REFERENCES "student_tables"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_tables" ADD CONSTRAINT "student_tables_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_tables" ADD CONSTRAINT "student_tables_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_tables" ADD CONSTRAINT "student_tables_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "academic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_tables" ADD CONSTRAINT "student_tables_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_instances" ADD CONSTRAINT "course_instances_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "course_tables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_instances" ADD CONSTRAINT "course_instances_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "program_courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_instances" ADD CONSTRAINT "course_instances_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "academic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_instances" ADD CONSTRAINT "course_instances_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_tables" ADD CONSTRAINT "course_tables_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_tables" ADD CONSTRAINT "course_tables_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_tables" ADD CONSTRAINT "course_tables_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "academic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "level_allowed_hours" ADD CONSTRAINT "level_allowed_hours_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
