// import { expect } from "chai";

// describe("test colleges routes", () => {
//   let college1Id: string;
//   it("tests create college route", async () => {
//     const res = await request.post(`${url}/admin/colleges/`).send({
//       englishName: "Arts",
//       arabicName: "الفنون",
//     });
//     expect(res.status).to.equal(201);
//     college1Id = res.body.id;
//   });

//   it("tests get all colleges route", async () => {
//     const res = await request.get(`${url}/admin/colleges`);
//     expect(res.status).to.equal(200);
//     expect(res.body.length).to.be.greaterThan(0);
//   });

//   it("tests get college route", async () => {
//     const res = await request.get(`${url}/admin/colleges/${college1Id}`);
//     expect(res.status).to.equal(200);
//     expect(res.body.id).to.equal(college1Id);
//   });

//   it("tests update college route", async () => {
//     const res = await request.put(`${url}/admin/colleges/${college1Id}`).send({
//       englishName: "Arts",
//       arabicName: "الفنون",
//     });
//     expect(res.status).to.equal(200);
//     expect(res.body.id).to.equal(college1Id);
//   });

//   it("tests delete college route", async () => {
//     const res = await request.delete(`${url}/admin/colleges/${college1Id}`);
//     expect(res.status).to.equal(200);
//   });
// });
