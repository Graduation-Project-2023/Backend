-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'SUPER';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "obtained" BOOLEAN NOT NULL DEFAULT false;
