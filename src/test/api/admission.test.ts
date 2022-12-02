import supertest from "supertest";
import app from "../../server";
import { UserRepo } from "../../db/userRepo";
import { expect } from "chai";

describe("test the admission routes", () => {
  it("reject request without csv", () => {
    supertest(app).post("/api/csv_upload").attach("csv", "").expect(400);
  });

  it("reject wrong extension", () => {
    supertest(app)
      .post("/api/csv_upload")
      .attach("csv", "src/test/assets/users.txt")
      .expect(400);
  });

  it("reject csv with wrong headers", () => {
    supertest(app)
      .post("/api/csv_upload")
      .attach("csv", "src/test/assets/xheaders.csv")
      .expect(400);
  });

  it("reject students with invalid nationalId", async () => {
    const res = supertest(app)
      .post("/api/csv_upload")
      .attach("csv", "src/test/assets/usersid.csv");
    expect((await res).body.message[0]).to.be.equal(
      "Student 1 has invalid national id"
    );
  });

  it("should create legit users from csv", () => {
    supertest(app)
      .post("/api/csv_upload")
      .attach("csv", "src/test/assets/users1.csv")
      .expect(200);
  });

  it("test the create route with invalidId", () => {
    supertest(app)
      .post("api/create_user")
      .send({
        englishName: "Salem El Hamood",
        arabicName: "سالم الحمود",
        nationality: "Saudi",
        nationalId: "123456789",
        gender: "ذكر",
        religion: "مسلم",
        birthDate: "1999-01-01",
        birthPlace: "Riyadh",
        guardianName: "Hamood El Hamood",
        address: "Hamood El Hamood street, Riyadh, Saudi Arabia",
        contactPhone: "+964 770 123 4567",
        homePhone: "0643217123",
      })
      .expect(400);
  });

  it("test the create route with validId", () => {
    supertest(app)
      .post("api/create_user")
      .send({
        englishName: "Salem El Hamood",
        arabicName: "سالم الحمود",
        nationality: "Saudi",
        nationalId: "12345678901234",
        gender: "ذكر",
        religion: "مسلم",
        birthDate: "1999-01-01",
        birthPlace: "Riyadh",
        guardianName: "Hamood El Hamood",
        address: "Hamood El Hamood street, Riyadh, Saudi Arabia",
        contactPhone: "+964 770 123 4567",
        homePhone: "0643217123",
      })
      .expect(200);
  });
});
