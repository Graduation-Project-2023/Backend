import supertest from "supertest";
import server from "../../server";
import { expect } from "chai";

describe("test programs routes", () => {
  let program1Id: string;
  let programCourse3: string;
  let course3Id: string;

  before(async () => {
    const res = await request.post(`${url}/admin/courses/`).send({
      englishName: "Advanced English",
      arabicName: "اللغة الانجليزية المتقدمة",
      id: "ENG103",
      collegeId: `${collegeId}`,
    });
    course3Id = res.body.id;
  });

  it("tests create program route", async () => {
    const res = await request.post(`${url}/admin/programs`).send({
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
    program1Id = res.body.id;
  });

  it("tests get all programs route", async () => {
    const res = await request.get(
      `${url}/admin/programs?college_id=${collegeId}`
    );
    expect(res.status).to.equal(200);
    expect(res.body.length).to.be.greaterThan(0);
  });

  it("tests create level", async () => {
    const res = await request
      .post(`${url}/admin/programs/${program1Id}/levels`)
      .send({
        programId: `${program1Id}`,
        englishName: "Fifth level",
        arabicName: "المستوى الخامس ",
        level: 5,
        qualifyingHrs: 156,
      });
    expect(res.status).to.equal(201);
  });

  it("tests get all levels", async () => {
    const res = await request.get(`${url}/admin/programs/${program1Id}/levels`);
    expect(res.status).to.equal(200);
    expect(res.body.length).to.be.greaterThan(0);
  });

  it("tests create programCourse", async () => {
    const res2 = await request
      .post(`${url}/admin/programs/${program1Id}/program_courses`)
      .send({
        programId: `${program1Id}`,
        code: `${course3Id}`,
        semester: "SECOND",
        courseType: "COMPULSORY",
        creditHours: 3,
        prerequisites: [`${programCourse1Id}`],
      });
    programCourse3 = res2.body.id;
    expect(res2.status).to.equal(201);
  });

  it("tests get all program courses", async () => {
    const res = await request.get(
      `${url}/admin/programs/${program1Id}/program_courses`
    );
    expect(res.status).to.equal(200);
    expect(res.body.length).to.be.greaterThan(0);
  });

  // it("tests get a program course with prerequisites", async () => {
  //   const res = await request.get(
  //     `${url}/admin/programs/${program1Id}/program_courses/${programCourse3}`
  //   );
  //   expect(res.status).to.equal(200);
  //   expect(res.body.prerequisites.length).to.equal(1);
  // });
});
