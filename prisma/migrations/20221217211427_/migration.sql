-- AlterTable
ALTER TABLE "course_instances" ADD COLUMN     "code" TEXT,
ADD COLUMN     "programId" TEXT;

-- AddForeignKey
ALTER TABLE "course_instances" ADD CONSTRAINT "course_instances_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
