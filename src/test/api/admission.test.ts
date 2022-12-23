import supertest from "supertest";
import app from "../../server";
import { expect } from "chai";
import prisma from "../../db";

const request = supertest(app);
const csvApi = "/api/student/many";

let college: any;
let student: any;

describe("test the admission routes", () => {
  before(async () => {
    college = await prisma.college.create({
      data: {
        englishName: "Faculty of Engineering",
        arabicName: "هندسة",
      },
    });
  });

  after(async () => {
    await prisma.student.deleteMany();
    await prisma.user.deleteMany();
  });

  it("rejects a request with no file", async () => {
    const response = await request.post(csvApi);
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal("Invalid file");
  });

  it("rejects a request with a non-csv file", async () => {
    const response = await request
      .post(csvApi)
      .attach("csv", `${__dirname}/../assets/users.txt`);
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal("Invalid file");
  });

  it("accepts a request with a csv file and correct headers", async () => {
    const response = await request
      .post(`${csvApi}?collegeId=${college.id}`)
      .attach("csv", "src/test/assets/right.csv");

    expect(response.status).to.equal(201);
  });

  // it("tests the create student route", async () => {
  //   student = await request.post("/api/student").send({
  //     email: "raafat@eng.suez.edu.eg",
  //     password: "123456",
  //     englishName: "Raafat El Hamood",
  //     arabicName: "سالم الحمود",
  //     nationality: "Saudi",
  //     nationalId: "12985278821234",
  //     gender: "MALE",
  //     religion: "MUSLIM",
  //     birthDate: new Date("1999-01-01"),
  //     birthPlace: "Riyadh",
  //     guardianName: "Hamood El Hamood",
  //     address: "Hamood El Hamood street, Riyadh, Saudi Arabia",
  //     contactPhone: "+964 770 123 4567",
  //     homePhone: "0643217123",
  //     collegeId: college.id,
  //   });
  //   // console.log(student.body);
  //   expect(student.status).to.equal(201);
  //   student = student.body;
  // });

  //   it("tests the getAll route", async () => {
  //     const response = await request.get(`/api/student/all/${college.id}`);
  //     expect(response.status).to.equal(200);
  //   });

  //   it("tests the get route", async () => {
  //     const response = await request.get(`/api/student/${student.id}`);
  //     expect(response.status).to.equal(200);
  //   });

  //   it("tests the update route", async () => {
  //     const response = await request.put(`/api/student/${student.id}`).send({
  //       englishName: "Hamooooooooooooooooooooooooooooooooooooooood",
  //     });
  //     expect(response.status).to.equal(200);
  //   });

  //   it("tests the delete route", async () => {
  //     const response = await request.delete(`/api/student/${student.id}`);
  //     expect(response.status).to.equal(200);
  //   });
});
