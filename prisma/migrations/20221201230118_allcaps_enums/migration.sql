-- AlterTable
ALTER TABLE "gpa_allowed_hours" ALTER COLUMN "maxCourses" DROP NOT NULL;

-- AlterTable
ALTER TABLE "level_allowed_hours" ALTER COLUMN "maxCourses" DROP NOT NULL;

-- AlterTable
ALTER TABLE "levels" ALTER COLUMN "qualifyingHrs" DROP NOT NULL;
