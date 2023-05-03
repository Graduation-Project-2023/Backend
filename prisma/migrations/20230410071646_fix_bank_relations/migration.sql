/*
  Warnings:

  - The primary key for the `banks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `code` on the `banks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `banks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `banks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "banks" DROP CONSTRAINT "banks_code_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_bankId_fkey";

-- DropIndex
DROP INDEX "banks_code_key";

-- AlterTable
ALTER TABLE "banks" DROP CONSTRAINT "banks_pkey",
DROP COLUMN "code",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "banks_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "banks_id_key" ON "banks"("id");

-- AddForeignKey
ALTER TABLE "banks" ADD CONSTRAINT "banks_id_fkey" FOREIGN KEY ("id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "banks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
