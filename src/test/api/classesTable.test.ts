import supertest from "supertest";
import server from "../../server";
import { expect } from "chai";
import prisma from "../../db";

const request = supertest(server);

describe("test classes table routes", () => {
  let courseInstance1Id: string;
  let courseInstance2Id: string;
  let classesTableId: string;

  before(async () => {
    await prisma.courseInstance.createMany({
      data: [
        {
          programCourseId: programCourse1Id,
          academicSemesterId,
          levelId: levelId,
          englishName: "English Name",
          arabicName: "Arabic Name",
        },
        {
          programCourseId: programCourse2Id,
          academicSemesterId,
          levelId: levelId,
          englishName: "English Name",
          arabicName: "Arabic Name",
        },
      ],
    });
  });

  after(async () => {
    await prisma.class.deleteMany();
    await prisma.courseInstance.deleteMany();
    await prisma.classesTable.deleteMany();
  });

  // get all course instances
  it("tests get all course instances", async () => {
    const res = await request.get(
      `/api/course_instances/semesters/${academicSemesterId}/levels/${levelId}`
    );
    expect(res.status).to.equal(200);
    expect(res.body.length).to.equal(2);
    courseInstance1Id = res.body[0].id;
    courseInstance2Id = res.body[1].id;
  });

  // create classes table
  it("tests create valid classesTable api", async () => {
    const res = await request
      .post(
        `/api/classes_tables/semesters/${academicSemesterId}/programs/${programId}`
      )
      .send({
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
    expect(res.status).to.equal(201);
    expect(res.body.levelId).to.equal(levelId);
    classesTableId = res.body.id;
  });

  it("tests get classes table api", async () => {
    const res = await request.get(
      `/api/classes_tables/semesters/${academicSemesterId}/programs/${programId}/${levelId}`
    );
    expect(res.status).to.equal(200);
    expect(res.body.classes.length).to.equal(2);
  });

  it("tests update classes table api", async () => {
    const res = await request
      .put(
        `/api/classes_tables/semesters/${academicSemesterId}/programs/${programId}/${classesTableId}`
      )
      .send({
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
    expect(res.status).to.equal(200);
    expect(res.body.classes.length).to.equal(1);
  });

  it("tests create invalid classesTable api", async () => {
    const res = await request
      .post(
        `/api/classes_tables/semesters/${academicSemesterId}/programs/${programId}`
      )
      .send({
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
            day: "MONDAY",
            startPeriod: 2,
            endPeriod: 4,
          },
        ],
      });
    expect(res.status).to.equal(400);
  });
});
