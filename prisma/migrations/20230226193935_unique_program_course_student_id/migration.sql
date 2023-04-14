/*
  Warnings:

  - A unique constraint covering the columns `[programCourseId,studentId]` on the table `available_courses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "available_courses_programCourseId_studentId_key" ON "available_courses"("programCourseId", "studentId");
