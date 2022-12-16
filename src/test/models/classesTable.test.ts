import prisma from "../../db";
import { expect } from "chai";
import { ClassesTable } from "../../models/classesTable";
import { CourseInstance } from "../../models/courseInstance";

describe("tests classTable models", () => {
  let courseInstance1Id: string;
  let courseInstance2Id: string;
  let classesTableId: string;

  before(async () => {
    const courseInstance1 = await CourseInstance.create({
      levelId,
      academicSemesterId: academicSemesterId,
      programCourseId: programCourse1Id,
    });
    expect(courseInstance1.levelId).to.equal(levelId);
    expect(courseInstance1.academicSemesterId).to.equal(academicSemesterId);
    courseInstance1Id = courseInstance1.id;
    const courseInstance2 = await CourseInstance.create({
      levelId,
      academicSemesterId: academicSemesterId,
      programCourseId: programCourse2Id,
    });
    expect(courseInstance2.levelId).to.equal(levelId);
    expect(courseInstance2.academicSemesterId).to.equal(academicSemesterId);
    courseInstance2Id = courseInstance2.id;
  });

  after(async () => {
    await prisma.class.deleteMany();
    await prisma.classesTable.deleteMany();
    await prisma.courseInstance.deleteMany();
  });

  it("tests create classesTable model", async () => {
    const classesTable = await ClassesTable.create({
      levelId,
      programId,
      academicSemesterId,
      classes: [
        {
          courseInstanceId: courseInstance1Id,
          classType: "LECTURE",
          day: "MONDAY",
          startPeriod: 1,
          endPeriod: 2,
        },
        {
          courseInstanceId: courseInstance2Id,
          classType: "LAB",
          day: "TUESDAY",
          startPeriod: 3,
          endPeriod: 4,
        },
      ],
    });
    expect(classesTable.levelId).to.equal(levelId);
    classesTableId = classesTable.id;
  });

  it("tests get classesTable model", async () => {
    const classesTable = await ClassesTable.get({
      levelId_semesterId: {
        levelId,
        semesterId: academicSemesterId,
      },
    });
    expect(classesTable?.levelId).to.equal(levelId);
    expect(classesTable?.classes.length).to.be.greaterThan(0);
  });

  it("tests getAll classesTable model", async () => {
    const classesTables = await ClassesTable.getAll({
      AND: [{ programId }, { levelId }],
    });
    expect(classesTables.length).to.be.greaterThan(0);
    expect(classesTables[0].level.englishName).to.be.a("string");
  });

  it("tests update classesTable model", async () => {
    const classesTable = await ClassesTable.update(classesTableId, {
      classes: [
        {
          courseInstanceId: courseInstance1Id,
          classType: "LECTURE",
          day: "MONDAY",
          startPeriod: 1,
          endPeriod: 2,
        },
      ],
    });
    expect(classesTable.levelId).to.equal(levelId);
    expect(classesTable.classes.length).to.equal(1);
  });
});
