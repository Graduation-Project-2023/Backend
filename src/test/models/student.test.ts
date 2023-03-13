import { expect } from "chai";
import { StudentService } from "../../services/studentService";
import prisma from "../../db";
import { executionAsyncId } from "async_hooks";

describe("Student service test", () => {
  let availableCourses: any;
  let availableClasses: any;
  before(async () => {
    const id1 = (
      await prisma.programCourse.create({
        data: {
          englishName: "English 101",
          arabicName: "اللغة الانجليزية 101",
          programId: programId1,
          courseType: "ELECTIVE",
          code: "ENG101",
        },
      })
    ).id;
    await prisma.programCourse.create({
      data: {
        englishName: "English 102",
        arabicName: "اللغة الانجليزية 102",
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
          englishName: "English 101",
          arabicName: "اللغة الانجليزية 101",
          programId: programId2,
          courseType: "ELECTIVE",
          code: "ENG101",
        },
      })
    ).id;
    await prisma.programCourse.create({
      data: {
        englishName: "English 102",
        arabicName: "اللغة الانجليزية 102",
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

    // create class instance
    const courseInstance1 = await prisma.courseInstance.create({
      data: {
        programCourseId: id1,
        academicSemesterId,
        levelId: levelId,
        programId: programId1,
      },
    });

    const courseInstance2 = await prisma.courseInstance.create({
      data: {
        programCourseId: id2,
        academicSemesterId,
        levelId: levelId,
        programId: programId2,
      },
    });

    // create classesTable
    await prisma.classesTable.create({
      data: {
        academicSemester: {
          connect: {
            id: academicSemesterId,
          },
        },
        program: {
          connect: {
            id: programId1,
          },
        },
        level: {
          connect: {
            id: levelId,
          },
        },
        classes: {
          create: [
            {
              courseInstance: {
                connect: {
                  id: courseInstance1.id,
                },
              },
              classType: "LECTURE",
              day: "SATURDAY",
              startPeriod: 1,
              endPeriod: 2,
              englishName: "English 101",
              arabicName: "Arabic 101",
            },
            {
              courseInstance: {
                connect: {
                  id: courseInstance2.id,
                },
              },
              classType: "LECTURE",
              day: "SUNDAY",
              startPeriod: 3,
              endPeriod: 4,
              englishName: "English 101",
              arabicName: "Arabic 101",
            },
            {
              courseInstance: {
                connect: {
                  id: courseInstance1.id,
                },
              },
              classType: "LECTURE",
              day: "SATURDAY",
              startPeriod: 1,
              endPeriod: 2,
              englishName: "English 101",
              arabicName: "Arabic 101",
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
    availableCourses = await StudentService.getStudentAvailableCourses(
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

  it("should get available classes", async () => {
    availableClasses = await StudentService.getStudentAvailableClasses(
      academicSemesterId,
      studentId
    );
    expect(availableClasses).to.have.lengthOf(2);
  });

  it("should register student to classes", async () => {
    const data = {
      courseInstances: availableClasses.map((course: any) => {
        const classes = course.classes.map((c: any) => c.id);
        return {
          courseInstanceId: course.id,
          classes,
        };
      }),
    };
    const table = await StudentService.studentRegister(
      studentId,
      academicSemesterId,
      data
    );
    expect(table.instances).to.have.lengthOf(2);
  });

  it("should get student timetable", async () => {
    const table = await StudentService.getStudentTable(
      studentId,
      academicSemesterId
    );
    expect(table?.instances).to.have.lengthOf(2);
    expect(table?.classes).to.have.lengthOf(3);
  });
});
