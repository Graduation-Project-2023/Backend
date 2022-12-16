-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'SEPARATED', 'WIDOWED');

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "armyNumber" TEXT,
ADD COLUMN     "enrollmentYearEndDate" TIMESTAMP(3),
ADD COLUMN     "guardianAddress" TEXT,
ADD COLUMN     "guardianNationality" TEXT,
ADD COLUMN     "guardianPhone" TEXT,
ADD COLUMN     "maritalStatus" "MaritalStatus",
ADD COLUMN     "otherNationality" TEXT,
ADD COLUMN     "recruitmentDate" TIMESTAMP(3),
ADD COLUMN     "recruitmentNumber" TEXT,
ADD COLUMN     "recruitmentState" TEXT,
ADD COLUMN     "reserveEndDate" TIMESTAMP(3);
