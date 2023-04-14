/*
  Warnings:

  - You are about to drop the column `departmentId` on the `programs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "programs" DROP CONSTRAINT "programs_departmentId_fkey";

-- AlterTable
ALTER TABLE "programs" DROP COLUMN "departmentId";

-- CreateTable
CREATE TABLE "_department_programs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_department_programs_AB_unique" ON "_department_programs"("A", "B");

-- CreateIndex
CREATE INDEX "_department_programs_B_index" ON "_department_programs"("B");

-- AddForeignKey
ALTER TABLE "_department_programs" ADD CONSTRAINT "_department_programs_A_fkey" FOREIGN KEY ("A") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_department_programs" ADD CONSTRAINT "_department_programs_B_fkey" FOREIGN KEY ("B") REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
