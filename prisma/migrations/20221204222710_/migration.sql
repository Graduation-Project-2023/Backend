-- DropForeignKey
ALTER TABLE "program_courses" DROP CONSTRAINT "program_courses_code_fkey";

-- AddForeignKey
ALTER TABLE "program_courses" ADD CONSTRAINT "program_courses_code_fkey" FOREIGN KEY ("code") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
