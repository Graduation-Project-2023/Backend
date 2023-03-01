import { expect } from "chai";
import { StudentService } from "../../services/studentService";
import prisma from "../../db";

describe("Student service test", () => {
  before(async () => {
    const id1 = (
      await prisma.programCourse.create({
        data: {
          programId: programId1,
          courseType: "ELECTIVE",
          code: "ENG101",
        },
      })
    ).id;
    await prisma.programCourse.create({
      data: {
        programId: programId1,
        courseType: "ELECTIVE",
        code: "ENG102",
        prerequisites: {
          connect: [
            {
              id: id1,
            },
          ],
        },
      },
    });

    const id2 = (
      await prisma.programCourse.create({
        data: {
          programId: programId2,
          courseType: "ELECTIVE",
          code: "ENG101",
        },
      })
    ).id;
    await prisma.programCourse.create({
      data: {
        programId: programId2,
        courseType: "ELECTIVE",
        code: "ENG102",
        prerequisites: {
          connect: [
            {
              id: id2,
            },
          ],
        },
      },
    });
  });

  it("should move student to next program", async () => {
    let student = await StudentService.moveStudentToNextProgram(studentId);
    expect(student?.programId).to.equal(programId1);
    student = await StudentService.moveStudentToNextProgram(studentId);
    expect(student?.programId).to.equal(programId2);
  });

  it("should get available courses", async () => {
    const availableCourses = await StudentService.getStudentAvailableCourses(
      studentId
    );
    expect(availableCourses).to.have.lengthOf(2);
    await StudentService.setStudentProgramAndAvailableCourses(
      studentId,
      programId2
    );
    const availableCourses2 = await StudentService.getStudentAvailableCourses(
      studentId
    );
    expect(availableCourses2).to.have.lengthOf(2);
  });
});
