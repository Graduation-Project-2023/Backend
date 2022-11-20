/*
  Warnings:

  - You are about to drop the column `address` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `arabicName` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `birthDate` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `birthPlace` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `contactEmail` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `contactPhone` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `englishName` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `guardianName` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `nationalId` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `religion` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nationalId]` on the table `forms` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[formId]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `homePhone` to the `forms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formId` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "forms" ADD COLUMN     "homePhone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "address",
DROP COLUMN "arabicName",
DROP COLUMN "birthDate",
DROP COLUMN "birthPlace",
DROP COLUMN "city",
DROP COLUMN "contactEmail",
DROP COLUMN "contactPhone",
DROP COLUMN "englishName",
DROP COLUMN "gender",
DROP COLUMN "guardianName",
DROP COLUMN "nationalId",
DROP COLUMN "nationality",
DROP COLUMN "religion",
ADD COLUMN     "formId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "forms_nationalId_key" ON "forms"("nationalId");

-- CreateIndex
CREATE UNIQUE INDEX "students_formId_key" ON "students"("formId");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_formId_fkey" FOREIGN KEY ("formId") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
