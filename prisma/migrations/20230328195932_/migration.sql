/*
  Warnings:

  - A unique constraint covering the columns `[instanceId,studentId]` on the table `student_course_instances` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "student_course_instances" ADD COLUMN     "totalScore" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "student_course_instances_instanceId_studentId_key" ON "student_course_instances"("instanceId", "studentId");
