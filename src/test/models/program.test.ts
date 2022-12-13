import { ProgramCourse } from "../../models/programs/programCourse";
import { Level } from "../../models/programs/programRelations";
import { expect } from "chai";

describe("test program models", () => {
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
      code: course2Id,
      levelId,
      prerequisites: [programCourseId],
    });
    expect(programCourse.code).to.equal(course2Id);
    programCourseId = programCourse.id;
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
