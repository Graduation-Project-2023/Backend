/*
  Warnings:

  - The primary key for the `prerequisites` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `programCode` on the `prerequisites` table. All the data in the column will be lost.
  - Added the required column `courseCode` to the `prerequisites` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "prerequisites" DROP CONSTRAINT "prerequisites_programCode_programId_fkey";

-- AlterTable
ALTER TABLE "prerequisites" DROP CONSTRAINT "prerequisites_pkey",
DROP COLUMN "programCode",
ADD COLUMN     "courseCode" TEXT NOT NULL,
ADD CONSTRAINT "prerequisites_pkey" PRIMARY KEY ("courseCode", "prerequisiteCode");

-- AddForeignKey
ALTER TABLE "prerequisites" ADD CONSTRAINT "prerequisites_courseCode_programId_fkey" FOREIGN KEY ("courseCode", "programId") REFERENCES "program_courses"("code", "programId") ON DELETE CASCADE ON UPDATE CASCADE;
