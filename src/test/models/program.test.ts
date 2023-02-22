import { ProgramCourse } from "../../models/programs/programCourse";
import { Level } from "../../models/programs/programRelations";
import { expect } from "chai";
import { Course } from "../../models/course";
import { Program } from "../../models/programs/program";

describe("test program models", () => {
  let localProgramCourseId: string;
  let course4Id: string;

  before(async () => {
    const course = await Course.create({
      englishName: "Advanced English",
      arabicName: "اللغة الانجليزية المتقدمة",
      id: "ENG109",
      collegeId: `${collegeId}`,
    });
    course4Id = course.id;
  });

  it("tests level creation", async () => {
    const levelModel = new Level();
    const level = await levelModel.create({
      englishName: "Level 1",
      arabicName: "المستوى الاول",
      level: 2,
      programId,
    });
    expect(level.englishName).to.equal("Level 1");
    expect(level.arabicName).to.equal("المستوى الاول");
  });

  it("tests create programCourse", async () => {
    const programCourse = await ProgramCourse.create({
      programId,
      semester: "SECOND",
      creditHours: 3,
      minimumHrsToRegister: 3,
      courseType: "COMPULSORY",
      code: course4Id,
      levelId,
      prerequisites: [programCourse1Id],
    });
    expect(programCourse.code).to.equal(course4Id);
    localProgramCourseId = programCourse.id;
  });

  it("tests get program course with prerequisites", async () => {
    const programCourse = await ProgramCourse.getByCode(course4Id, programId);
    expect(programCourse?.prerequisites.length).to.equal(1);
  });

  it("tests update program course", async () => {
    const programCourse = await ProgramCourse.update(localProgramCourseId, {
      semester: "FIRST",
      programId: programId,
      prerequisites: [],
    });
    expect(programCourse?.semester).to.equal("FIRST");
    const programCourse2 = await ProgramCourse.getByCode(course4Id, programId);
    expect(programCourse2?.prerequisites.length).to.equal(0);
  });

  it("tests get next program in department", async () => {
    const program = await Program.getNextProgram(departmentId, programId1);
    expect(program?.id).to.equal(programId2);
  });
});
