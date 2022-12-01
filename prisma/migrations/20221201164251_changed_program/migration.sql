/*
  Warnings:

  - Added the required column `system` to the `programs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "programs" ADD COLUMN     "hasSummerSemester" BOOLEAN,
ADD COLUMN     "system" "System" NOT NULL,
ALTER COLUMN "creditHours" DROP NOT NULL;
