/*
  Warnings:

  - You are about to drop the column `departmentId` on the `students` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_departmentId_fkey";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "departmentId",
ADD COLUMN     "departmentCode" TEXT;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_departmentCode_fkey" FOREIGN KEY ("departmentCode") REFERENCES "departments"("code") ON DELETE SET NULL ON UPDATE CASCADE;
