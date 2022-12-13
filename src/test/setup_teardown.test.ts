import prisma from "../db";
import { College } from "../models/college";
import { Course } from "../models/course";
import { Program } from "../models/programs/program";
import { ProgramCourse } from "../models/programs/programCourse";
import { Level } from "../models/programs/programRelations";

// declare a global variable for all tests
declare global {
  var collegeId: string;
  var course1Id: string;
  var course2Id: string;
  var programId: string;
  var levelId: string;
  var programCourseId: string;
}

// run before any test
before(async () => {
  const college = await College.create({
    englishName: "Arts",
    arabicName: "الفنون",
  });
  global.collegeId = college.id;

  const course1 = await Course.create({
    englishName: "English",
    arabicName: "اللغة الانجليزية",
    collegeId: global.collegeId,
    id: "ENG101",
  });
  global.course1Id = course1.id;

  const course2 = await Course.create({
    englishName: "Advanced English",
    arabicName: "اللغة الانجليزية المتقدمة",
    collegeId: global.collegeId,
    id: "ENG102",
  });
  global.course2Id = course2.id;

  const program = await Program.create({
    englishName: "Computer Science",
    arabicName: "علوم الحاسب",
    collegeId,
    programCode: "BSM01",
    creditHours: 120,
    mandatoryHours: 60,
    optionalHours: 60,
    projectQualifyingHours: 0,
    periodLength: 1,
    feesType: "CREDITHOURS",
    summerFeesType: "CREDITHOURS",
    allowedHrs: "SEMESTER",
    prerequisiteProgramId: null,
    gradeLowering: 55,
    attemptsToLowerGrade: 1,
    failureGrade: 50,
    degree: "BACHELOR",
    hasSummerSemester: true,
    system: "SCHOOLYEAR",
    maxGrade: 100,
  });
  global.programId = program.id;

  const level = await new Level().create({
    englishName: "Level 1",
    arabicName: "المستوى الاول",
    level: 1,
    programId,
  });
  global.levelId = level.id;

  const programCourse = await ProgramCourse.create({
    programId,
    semester: "FIRST",
    creditHours: 3,
    minimumHrsToRegister: 3,
    courseType: "COMPULSORY",
    code: course1Id,
    levelId,
  });
  global.programCourseId = programCourse.id;
});

after(async () => {
  await prisma.programCourse.deleteMany();
  await prisma.levelAllowedHours.deleteMany();
  await prisma.level.deleteMany();
  await prisma.course.deleteMany();
  await prisma.program.deleteMany();
  await prisma.college.deleteMany();
  await prisma.gpaAllowedHours.deleteMany();
  await prisma.$disconnect();
});
