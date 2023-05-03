/*
  Warnings:

  - The primary key for the `banks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `banks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "banks" DROP CONSTRAINT "banks_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "banks_pkey" PRIMARY KEY ("code");
