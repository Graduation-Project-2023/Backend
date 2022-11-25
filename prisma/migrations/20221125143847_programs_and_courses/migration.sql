-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_collegeId_fkey";

-- AlterTable
ALTER TABLE "students" ALTER COLUMN "collegeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "colleges"("id") ON DELETE SET NULL ON UPDATE CASCADE;
