/*
  Warnings:

  - You are about to drop the column `arabicName` on the `student_course_instances` table. All the data in the column will be lost.
  - You are about to drop the column `englishName` on the `student_course_instances` table. All the data in the column will be lost.
  - You are about to drop the column `lectureDay` on the `student_course_instances` table. All the data in the column will be lost.
  - You are about to drop the column `lectureEndPeriod` on the `student_course_instances` table. All the data in the column will be lost.
  - You are about to drop the column `lectureStartDate` on the `student_course_instances` table. All the data in the column will be lost.
  - You are about to drop the column `lectureStartPeriod` on the `student_course_instances` table. All the data in the column will be lost.
  - You are about to drop the column `sectionEndPeriod` on the `student_course_instances` table. All the data in the column will be lost.
  - You are about to drop the column `sectionStartDate` on the `student_course_instances` table. All the data in the column will be lost.
  - You are about to drop the column `sectionStartPeriod` on the `student_course_instances` table. All the data in the column will be lost.
  - You are about to drop the column `studentTableId` on the `student_course_instances` table. All the data in the column will be lost.
  - You are about to drop the column `tableId` on the `student_course_instances` table. All the data in the column will be lost.
  - You are about to drop the `student_tables` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "student_course_instances" DROP CONSTRAINT "student_course_instances_studentTableId_fkey";

-- DropForeignKey
ALTER TABLE "student_tables" DROP CONSTRAINT "student_tables_levelId_fkey";

-- DropForeignKey
ALTER TABLE "student_tables" DROP CONSTRAINT "student_tables_programId_fkey";

-- DropForeignKey
ALTER TABLE "student_tables" DROP CONSTRAINT "student_tables_semesterId_fkey";

-- DropForeignKey
ALTER TABLE "student_tables" DROP CONSTRAINT "student_tables_studentId_fkey";

-- DropIndex
DROP INDEX "student_course_instances_studentId_instanceId_key";

-- AlterTable
ALTER TABLE "student_course_instances" DROP COLUMN "arabicName",
DROP COLUMN "englishName",
DROP COLUMN "lectureDay",
DROP COLUMN "lectureEndPeriod",
DROP COLUMN "lectureStartDate",
DROP COLUMN "lectureStartPeriod",
DROP COLUMN "sectionEndPeriod",
DROP COLUMN "sectionStartDate",
DROP COLUMN "sectionStartPeriod",
DROP COLUMN "studentTableId",
DROP COLUMN "tableId",
ADD COLUMN     "lectureGroup" "Group",
ADD COLUMN     "sectionGroup" "Group",
ALTER COLUMN "finished" DROP NOT NULL;

-- DropTable
DROP TABLE "student_tables";

-- CreateTable
CREATE TABLE "_ClassToStudentCourseInstance" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClassToStudentCourseInstance_AB_unique" ON "_ClassToStudentCourseInstance"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassToStudentCourseInstance_B_index" ON "_ClassToStudentCourseInstance"("B");

-- AddForeignKey
ALTER TABLE "_ClassToStudentCourseInstance" ADD CONSTRAINT "_ClassToStudentCourseInstance_A_fkey" FOREIGN KEY ("A") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToStudentCourseInstance" ADD CONSTRAINT "_ClassToStudentCourseInstance_B_fkey" FOREIGN KEY ("B") REFERENCES "student_course_instances"("id") ON DELETE CASCADE ON UPDATE CASCADE;
