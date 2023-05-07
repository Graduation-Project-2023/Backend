-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_addedBy_fkey";

-- DropForeignKey
ALTER TABLE "sheets" DROP CONSTRAINT "sheets_createdBy_fkey";

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_addedBy_fkey" FOREIGN KEY ("addedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sheets" ADD CONSTRAINT "sheets_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
