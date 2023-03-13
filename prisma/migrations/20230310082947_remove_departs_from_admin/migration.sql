/*
  Warnings:

  - You are about to drop the column `departmentId` on the `admins` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_departmentId_fkey";

-- AlterTable
ALTER TABLE "admins" DROP COLUMN "departmentId";
