import prisma from "../db";
import { AcademicSemester } from "../models/academicSemester";
import { College } from "../models/college";
import { Course } from "../models/course";
import { Program } from "../models/programs/program";
import { ProgramCourse } from "../models/programs/programCourse";
import { Department } from "../models/department";
import { Level } from "../models/programs/programRelations";
import superagent from "superagent";
import supertest from "supertest";
import server from "../server";
import { User } from "../models/user";
import { Student } from "../models/student";

// declare a global variable for all tests
declare global {
  var collegeId: string;
  var course1Id: string;
  var course2Id: string;
  var programId: string;
  var programId1: string;
  var programId2: string;
  var levelId: string;
  var programCourse1Id: string;
  var programCourse2Id: string;
  var academicSemesterId: string;
  var url: string;
  var request: superagent.SuperAgent<superagent.SuperAgentRequest>;
  var departmentCode: string;
  var departmentId: string;
  var studentId: string;
  var userId: string;
}

// run before any test
before(async () => {
  global.url = "/api";
  const admin = await User.create({
    email: "SalemEladmin@admin.com",
    password: "123456",
    role: "ADMIN",
  });

  // const student_ = await User.create({
  //   email: "SalemElstudent@student.com",
  //   password: "123456",
  //   role: "STUDENT",
  // });

  // create a global request object with port 3000
  global.request = supertest.agent(server);

  await request.post(`/api/auth/admin_login`).send({
    email: admin.email,
    password: "123456",
  });

  // const student_login = await request.post(`/api/auth/student_login`).send({
  //   email: student_.email,
  //   password: "123456",
  // });

  // global.userId = admin_login.body.id;
  // console.log("student_login.body.id", student_login.body.id);

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
    system: "CREDIT",
    maxGrade: 100,
  });
  global.programId = program.id;

  const program1 = await Program.create({
    englishName: "Preparatory",
    arabicName: "مستوى اول",
    collegeId,
    programCode: "BSX01",
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
    system: "CREDIT",
    hrsToPass: 25,
    maxGrade: 100,
  });
  global.programId1 = program1.id;

  const program2 = await Program.create({
    englishName: "Mechanical Power Engineering",
    arabicName: "هندسة ميكانيكا القوى",
    collegeId,
    programCode: "BSX02",
    creditHours: 120,
    mandatoryHours: 60,
    optionalHours: 60,
    projectQualifyingHours: 0,
    periodLength: 1,
    feesType: "CREDITHOURS",
    summerFeesType: "CREDITHOURS",
    allowedHrs: "SEMESTER",
    prerequisiteProgramId: programId1,
    gradeLowering: 55,
    attemptsToLowerGrade: 1,
    failureGrade: 50,
    degree: "BACHELOR",
    hasSummerSemester: true,
    system: "CREDIT",
    maxGrade: 100,
  });
  global.programId2 = program2.id;

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
  global.programCourse1Id = programCourse.id;

  const programCourse2 = await ProgramCourse.create({
    programId,
    semester: "FIRST",
    creditHours: 3,
    minimumHrsToRegister: 3,
    courseType: "COMPULSORY",
    code: course2Id,
    levelId,
  });
  global.programCourse2Id = programCourse2.id;

  const department = await Department.create({
    englishName: "Mechanical Engineering",
    arabicName: "هندسة الميكانيكا",
    code: "CS",
    collegeId,
    system: "CREDIT",
    programs: [programId1, programId2],
  });
  global.departmentId = department.id;

  const student = await Student.create({
    email: "Hamood@eng.suez.edu.eg",
    password: "123456",
    englishName: "Raafat El Hamood",
    arabicName: "سالم الحمود",
    nationality: "Saudi",
    nationalId: "12985278821235",
    gender: "MALE",
    religion: "MUSLIM",
    birthDate: "1999-01-01",
    creditHrs: 35,
    birthPlace: "Riyadh",
    guardianName: "Hamood El Hamood",
    address: "Hamood El Hamood street, Riyadh, Saudi Arabia",
    contactPhone: "+964 770 123 4567",
    homePhone: "0643217123",
    departmentCode: department.code,
    collegeId,
  });
  global.studentId = student.id;

  const academicSemester = await AcademicSemester.create({
    academicYear: "2022/2023",
    semester: "FIRST",
  });
  global.academicSemesterId = academicSemester.id;
});

after(async () => {
  await prisma.studentTable.deleteMany();
  await prisma.availableCourse.deleteMany();
  await prisma.studentCourseInstance.deleteMany();
  await prisma.student.deleteMany();
  await prisma.user.deleteMany();
  await prisma.class.deleteMany();
  await prisma.classesTable.deleteMany();
  await prisma.courseInstance.deleteMany();
  await prisma.programCourse.deleteMany();
  await prisma.levelAllowedHours.deleteMany();
  await prisma.course.deleteMany();
  await prisma.gpaAllowedHours.deleteMany();
  await prisma.level.deleteMany();
  await prisma.program.deleteMany();
  await prisma.department.deleteMany();
  await prisma.college.deleteMany();
  await prisma.academicSemester.deleteMany();
  await prisma.$disconnect();
});
