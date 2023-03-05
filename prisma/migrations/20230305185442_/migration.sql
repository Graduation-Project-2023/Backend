/*
  Warnings:

  - A unique constraint covering the columns `[studentId,academicSemesterId]` on the table `student_tables` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "student_tables_studentId_academicSemesterId_key" ON "student_tables"("studentId", "academicSemesterId");
