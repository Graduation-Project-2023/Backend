-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_programId_fkey";

-- AlterTable
ALTER TABLE "students" ALTER COLUMN "programId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
