/*
  Warnings:

  - You are about to drop the `_ClassToStudentCourseInstance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ClassToStudentCourseInstance" DROP CONSTRAINT "_ClassToStudentCourseInstance_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToStudentCourseInstance" DROP CONSTRAINT "_ClassToStudentCourseInstance_B_fkey";

-- AlterTable
ALTER TABLE "student_course_instances" ADD COLUMN     "tableId" TEXT;

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "tableId" TEXT;

-- DropTable
DROP TABLE "_ClassToStudentCourseInstance";

-- CreateTable
CREATE TABLE "student_tables" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "academicSemesterId" TEXT NOT NULL,

    CONSTRAINT "student_tables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClassToStudentTable" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClassToStudentTable_AB_unique" ON "_ClassToStudentTable"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassToStudentTable_B_index" ON "_ClassToStudentTable"("B");

-- AddForeignKey
ALTER TABLE "student_tables" ADD CONSTRAINT "student_tables_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_tables" ADD CONSTRAINT "student_tables_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "academic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_course_instances" ADD CONSTRAINT "student_course_instances_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "student_tables"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToStudentTable" ADD CONSTRAINT "_ClassToStudentTable_A_fkey" FOREIGN KEY ("A") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToStudentTable" ADD CONSTRAINT "_ClassToStudentTable_B_fkey" FOREIGN KEY ("B") REFERENCES "student_tables"("id") ON DELETE CASCADE ON UPDATE CASCADE;
