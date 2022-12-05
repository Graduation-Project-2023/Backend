/*
  Warnings:

  - You are about to drop the column `courseCode` on the `courses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `courses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "program_courses" DROP CONSTRAINT "program_courses_code_fkey";

-- DropIndex
DROP INDEX "courses_courseCode_key";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "courseCode",
ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "courses_code_key" ON "courses"("code");

-- AddForeignKey
ALTER TABLE "program_courses" ADD CONSTRAINT "program_courses_code_fkey" FOREIGN KEY ("code") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
