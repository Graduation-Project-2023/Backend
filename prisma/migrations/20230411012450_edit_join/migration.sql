/*
  Warnings:

  - You are about to drop the column `sheetId` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `createdby` on the `sheets` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `sheets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_sheetId_fkey";

-- DropForeignKey
ALTER TABLE "sheets" DROP CONSTRAINT "sheets_createdby_fkey";

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "sheetId";

-- AlterTable
ALTER TABLE "sheets" DROP COLUMN "createdby",
ADD COLUMN     "createdBy" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_QuestionToSheet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionToSheet_AB_unique" ON "_QuestionToSheet"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionToSheet_B_index" ON "_QuestionToSheet"("B");

-- AddForeignKey
ALTER TABLE "sheets" ADD CONSTRAINT "sheets_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "professors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToSheet" ADD CONSTRAINT "_QuestionToSheet_A_fkey" FOREIGN KEY ("A") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToSheet" ADD CONSTRAINT "_QuestionToSheet_B_fkey" FOREIGN KEY ("B") REFERENCES "sheets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
