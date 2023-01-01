-- CreateEnum
CREATE TYPE "Group" AS ENUM ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L');

-- AlterTable
ALTER TABLE "classes" ADD COLUMN     "group" "Group";

-- AlterTable
ALTER TABLE "course_instances" ADD COLUMN     "hasLectureGroups" BOOLEAN,
ADD COLUMN     "labGroupCount" INTEGER,
ADD COLUMN     "lectureGroupCount" INTEGER,
ADD COLUMN     "sectionGroupCount" INTEGER;
