/*
  Warnings:

  - The `answer` column on the `questions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_bankId_fkey";

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "answer",
ADD COLUMN     "answer" TEXT[];

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "banks"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
