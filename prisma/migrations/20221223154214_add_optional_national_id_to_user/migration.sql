/*
  Warnings:

  - You are about to drop the column `userId` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nationalId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_userId_fkey";

-- DropIndex
DROP INDEX "students_userId_key";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "nationalId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_nationalId_key" ON "users"("nationalId");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_nationalId_fkey" FOREIGN KEY ("nationalId") REFERENCES "users"("nationalId") ON DELETE RESTRICT ON UPDATE CASCADE;
