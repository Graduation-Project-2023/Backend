/*
  Warnings:

  - The `degree` column on the `programs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Degree" AS ENUM ('BACHELOR', 'DIPLOMA');

-- AlterTable
ALTER TABLE "programs" DROP COLUMN "degree",
ADD COLUMN     "degree" "Degree";
