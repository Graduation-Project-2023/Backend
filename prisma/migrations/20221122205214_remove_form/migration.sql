/*
  Warnings:

  - You are about to drop the column `formId` on the `students` table. All the data in the column will be lost.
  - You are about to drop the `forms` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nationalId]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arabicName` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthPlace` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPhone` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `englishName` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guardianName` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homePhone` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationalId` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `religion` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_formId_fkey";

-- DropIndex
DROP INDEX "students_formId_key";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "formId",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "arabicName" TEXT NOT NULL,
ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "birthPlace" TEXT NOT NULL,
ADD COLUMN     "contactPhone" TEXT NOT NULL,
ADD COLUMN     "englishName" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "guardianName" TEXT NOT NULL,
ADD COLUMN     "homePhone" TEXT NOT NULL,
ADD COLUMN     "nationalId" TEXT NOT NULL,
ADD COLUMN     "nationality" TEXT NOT NULL,
ADD COLUMN     "religion" "Religion" NOT NULL;

-- DropTable
DROP TABLE "forms";

-- CreateIndex
CREATE UNIQUE INDEX "students_nationalId_key" ON "students"("nationalId");
