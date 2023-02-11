import { expect } from "chai";

describe("test departments routes", () => {
  let departmentId: string;
  it("tests create department route", async () => {
    const res = await request.post(`${url}/admin/departments`).send({
      englishName: "Mechanical Engineering",
      arabicName: "هندسة الميكانيكا",
      collegeId: `${collegeId}`,
      system: "CREDIT",
      programs: [programId1, programId2],
    });
    departmentId = res.body.id;
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
  });

  it("tests create Invalid department route", async () => {
    const res = await request.post(`${url}/admin/departments`).send({
      englishName: "Mechanical Engineering",
      arabicName: "هندسة الميكانيكا",
      collegeId: `${collegeId}`,
      system: "CREDIT",
      programs: [programId, programId2],
    });
    expect(res.status).to.equal(400);
  });

  it("tests create department without programs route", async () => {
    const res = await request.post(`${url}/admin/departments`).send({
      englishName: "Mechanical Engineering",
      arabicName: "هندسة الميكانيكا",
      collegeId: `${collegeId}`,
      system: "CREDIT",
    });
    expect(res.status).to.equal(400);
  });

  it("tests update department without programs", async () => {
    const res = await request
      .put(`${url}/admin/departments/${departmentId}`)
      .send({
        englishName: "Mechanical Engineering",
        arabicName: "الهندسة الميكانيكية",
        collegeId: `${collegeId}`,
        system: "CREDIT",
      });
    expect(res.status).to.equal(200);
  });
});
