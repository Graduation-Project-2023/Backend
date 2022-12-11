import supertest from "supertest";
import server from "../../server";
import { expect } from "chai";

const request = supertest(server);

describe("test colleges routes", () => {
  let collegeId: string;

  it("tests create college route", async () => {
    const res = await request.post("/api/colleges/").send({
      englishName: "Arts",
      arabicName: "الفنون",
    });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
    collegeId = res.body.id;
  });

  it("tests get all colleges route", async () => {
    const res = await request.get("/api/colleges");
    expect(res.status).to.equal(200);
    expect(res.body.length).to.be.greaterThan(0);
  });

  it("tests get college route", async () => {
    const res = await request.get(`/api/colleges/${collegeId}`);
    expect(res.status).to.equal(200);
    expect(res.body.id).to.equal(collegeId);
  });

  it("tests update college route", async () => {
    const res = await request.put(`/api/colleges/${collegeId}`).send({
      englishName: "Arts",
      arabicName: "الفنون",
    });
    expect(res.status).to.equal(200);
    expect(res.body.id).to.equal(collegeId);
  });

  it("tests delete college route", async () => {
    const res = await request.delete(`/api/colleges/${collegeId}`);
    expect(res.status).to.equal(200);
  });
});
