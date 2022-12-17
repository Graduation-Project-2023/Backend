-- AlterTable
ALTER TABLE "course_instances" ADD COLUMN     "creditHours" INTEGER,
ADD COLUMN     "labCount" INTEGER DEFAULT 0,
ADD COLUMN     "labHrs" INTEGER DEFAULT 0,
ADD COLUMN     "lectureCount" INTEGER DEFAULT 1,
ADD COLUMN     "lectureHrs" INTEGER DEFAULT 2;
