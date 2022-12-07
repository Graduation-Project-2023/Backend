import supertest from "supertest";
import server from "../../server";
import { expect } from "chai";
import prisma from "../../db";

const request = supertest(server);

describe("test programs routes", () => {
  let programId: string;
  let collegeId: string;
  let course1Id: string;
  let course2Id: string;

  before(async () => {
    const res = await request.post("/api/colleges/").send({
      englishName: "Arts",
      arabicName: "الفنون",
    });
    collegeId = res.body.id;
    const res1 = await request.post("/api/courses/").send({
      englishName: "English",
      arabicName: "اللغة الانجليزية",
      id: "ENGL101",
      collegeId: `${collegeId}`,
    });
    course1Id = res1.body.id;
    const res2 = await request.post("/api/courses/").send({
      englishName: "Advanced English",
      arabicName: "اللغة الانجليزية المتقدمة",
      id: "ENGL102",
      collegeId: `${collegeId}`,
    });
    course2Id = res2.body.id;
  });

  // delete all created models
  after(async () => {
    await prisma.programCourse.deleteMany();
    await prisma.course.deleteMany();
    await prisma.level.deleteMany();
    await prisma.program.deleteMany();
    await prisma.college.deleteMany();
  });

  it("tests create program route", async () => {
    const res = await request.post("/api/programs/").send({
      englishName: "ِِArchitecture Engineering",
      arabicName: "الهندسة المعمارية",
      collegeId: `${collegeId}`,
      programCode: "BMCS7",
      degree: "BACHELOR",
      system: "SCHOOLYEAR",
      creditHours: 38,
      allowedHrs: "SEMESTER",
      mandatoryHours: 21,
      optionalHours: 9,
      projectQualifyingHours: 8,
      feesType: "CREDITHOURS",
      summerFeesType: "CREDITHOURS",
      gradeLowering: 55,
      attemptsToLowerGrade: 4,
      failureGrade: 10,
    });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
    programId = res.body.id;
  });

  it("tests get all programs route", async () => {
    const res = await request.get(`/api/programs?college_id=${collegeId}`);
    expect(res.status).to.equal(200);
    expect(res.body.length).to.be.greaterThan(0);
  });

  it("tests create level", async () => {
    const res = await request.post(`/api/programs/${programId}/levels`).send({
      programId: `${programId}`,
      englishName: "Fifth level",
      arabicName: "المستوى الخامس ",
      level: 5,
      qualifyingHrs: 156,
    });
    expect(res.status).to.equal(201);
  });

  it("tests get all levels", async () => {
    const res = await request.get(`/api/programs/${programId}/levels`);
    expect(res.status).to.equal(200);
    expect(res.body.length).to.be.greaterThan(0);
  });

  it("tests create two consecutive courses", async () => {
    const res1 = await request
      .post(`/api/programs/${programId}/program_courses`)
      .send({
        programId: `${programId}`,
        code: `${course1Id}`,
        semester: "FIRST",
        courseType: "COMPULSORY",
        creditHours: 3,
      });
    expect(res1.status).to.equal(201);
    const res2 = await request
      .post(`/api/programs/${programId}/program_courses`)
      .send({
        programId: `${programId}`,
        code: `${course2Id}`,
        semester: "SECOND",
        courseType: "COMPULSORY",
        creditHours: 3,
        prerequisites: [`${course1Id}`],
      });
    expect(res2.status).to.equal(201);
  });

  it("tests get all program courses", async () => {
    const res = await request.get(`/api/programs/${programId}/program_courses`);
    expect(res.status).to.equal(200);
    expect(res.body.length).to.be.greaterThan(0);
  });

  it("tests get a program course with prerequisites", async () => {
    const res = await request.get(
      `/api/programs/${programId}/program_courses/${course2Id}`
    );
    expect(res.status).to.equal(200);
    expect(res.body.prerequisites.length).to.equal(1);
  });
});
