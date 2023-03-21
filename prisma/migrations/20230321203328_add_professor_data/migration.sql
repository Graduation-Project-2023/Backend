-- CreateEnum
CREATE TYPE "Position" AS ENUM ('delegated', 'permanent');

-- AlterTable
ALTER TABLE "professors" ADD COLUMN     "position" "Position" NOT NULL DEFAULT 'permanent',
ADD COLUMN     "title" TEXT;
