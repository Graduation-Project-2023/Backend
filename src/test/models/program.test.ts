import { Program } from "../../models/programs/program";
import { ProgramCourse } from "../../models/programs/programCourse";
import { Level } from "../../models/programs/programRelations";
import { Course } from "../../models/course";
import { College } from "../../models/college";
import { expect } from "chai";
import prisma from "../../db";

describe("test program models", () => {
  let collegeId: string;
  let programId: string;
  let course1Id: string;
  let course2Id: string;
  let levelId: string;
  let programCourseId: string;

  after(async () => {
    await prisma.programCourse.deleteMany();
    await prisma.level.deleteMany();
    await prisma.program.deleteMany();
    await prisma.course.deleteMany();
    await prisma.college.deleteMany();
  });

  before(async () => {
    const college = await College.create({
      englishName: "Arts",
      arabicName: "الفنون",
    });
    collegeId = college.id;
    const course1 = await Course.create({
      englishName: "English",
      arabicName: "اللغة الانجليزية",
      id: "ENGL101",
      collegeId,
    });
    course1Id = course1.id;
    const course2 = await Course.create({
      englishName: "Advanced English",
      arabicName: "اللغة الانجليزية المتقدمة",
      id: "ENGL102",
      collegeId,
    });
    course2Id = course2.id;
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
    programId = program.id;
  });

  it("tests level creation", async () => {
    const levelModel = new Level();
    const level = await levelModel.create({
      englishName: "Level 1",
      arabicName: "المستوى الاول",
      level: 1,
      programId,
    });
    expect(level.englishName).to.equal("Level 1");
    expect(level.arabicName).to.equal("المستوى الاول");
    levelId = level.id;
  });

  it("tests multiple consecutive program course creation", async () => {
    const programCourse1 = await ProgramCourse.create({
      programId,
      semester: "FIRST",
      creditHours: 3,
      minimumHrsToRegister: 3,
      courseType: "COMPULSORY",
      code: course1Id,
      levelId,
    });
    expect(programCourse1.code).to.equal(course1Id);
    const programCourse2 = await ProgramCourse.create({
      programId,
      semester: "SECOND",
      creditHours: 3,
      minimumHrsToRegister: 3,
      courseType: "COMPULSORY",
      code: course2Id,
      levelId,
      prerequisites: [course1Id],
    });
    expect(programCourse2.code).to.equal(course2Id);
    programCourseId = programCourse2.id;
  });

  it("tests get program course with prerequisites", async () => {
    const programCourse = await ProgramCourse.getByCode(course2Id, programId);
    expect(programCourse?.prerequisites.length).to.equal(1);
  });

  it("tests update program course", async () => {
    const programCourse = await ProgramCourse.update(programCourseId, {
      semester: "FIRST",
      programId: programId,
      prerequisites: [],
    });
    expect(programCourse?.semester).to.equal("FIRST");
    const programCourse2 = await ProgramCourse.getByCode(course2Id, programId);
    expect(programCourse2?.prerequisites.length).to.equal(0);
  });
});
