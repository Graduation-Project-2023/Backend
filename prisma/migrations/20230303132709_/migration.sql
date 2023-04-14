-- AlterTable
ALTER TABLE "available_courses" ADD COLUMN     "levelId" TEXT;

-- AddForeignKey
ALTER TABLE "available_courses" ADD CONSTRAINT "available_courses_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "levels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
