/*
  Warnings:

  - Made the column `arabicDescription` on table `courses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `englishDescription` on table `courses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "arabicDescription" SET NOT NULL,
ALTER COLUMN "englishDescription" SET NOT NULL;
