/*
  Warnings:

  - You are about to drop the column `groupId` on the `classes` table. All the data in the column will be lost.
  - Added the required column `arabicName` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classType` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endPeriod` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `englishName` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startPeriod` to the `classes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classes" DROP COLUMN "groupId",
ADD COLUMN     "arabicName" TEXT NOT NULL,
ADD COLUMN     "classType" "ClassType" NOT NULL,
ADD COLUMN     "day" "Day" NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "endPeriod" INTEGER NOT NULL,
ADD COLUMN     "englishName" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "startPeriod" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "classes_tableId_idx" ON "classes" USING HASH ("tableId");

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_courseInstanceId_fkey" FOREIGN KEY ("courseInstanceId") REFERENCES "course_instances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
