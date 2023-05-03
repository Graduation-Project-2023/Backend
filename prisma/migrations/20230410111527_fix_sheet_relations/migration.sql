/*
  Warnings:

  - You are about to drop the column `courseName` on the `sheets` table. All the data in the column will be lost.
  - Added the required column `bankId` to the `sheets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sheets" DROP CONSTRAINT "sheets_courseName_fkey";

-- AlterTable
ALTER TABLE "sheets" DROP COLUMN "courseName",
ADD COLUMN     "bankId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "sheets" ADD CONSTRAINT "sheets_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "banks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
