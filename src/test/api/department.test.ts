import { expect } from "chai";

describe("test departments routes", () => {
  //   it("tests create department route", async () => {
  //     const res = await request.post(`${url}/admin/departments`).send({
  //       englishName: "Mechanical Engineering",
  //       arabicName: "هندسة الميكانيكا",
  //       collegeId: `${collegeId}`,
  //       system: "CREDIT",
  //       programs: [programId1, programId2],
  //     });
  //     expect(res.status).to.equal(201);
  //     expect(res.body).to.have.property("id");
  //   });

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
});
