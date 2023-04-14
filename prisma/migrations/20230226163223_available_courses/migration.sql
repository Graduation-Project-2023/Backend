-- CreateTable
CREATE TABLE "available_courses" (
    "id" TEXT NOT NULL,
    "programCourseId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "finished" BOOLEAN,
    "unlocked" BOOLEAN,

    CONSTRAINT "available_courses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "available_courses" ADD CONSTRAINT "available_courses_programCourseId_fkey" FOREIGN KEY ("programCourseId") REFERENCES "program_courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_courses" ADD CONSTRAINT "available_courses_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
