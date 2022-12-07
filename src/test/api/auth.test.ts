import supertest from "supertest";
import app from "../../server";
import prisma from "../../db";
import bcrypt from "bcrypt";

describe("testing auth routes ", () => {
  let user: any;

  before(async () => {
    const pass = bcrypt.hashSync("salemHamoooood" + process.env.PEPPER, 13);
    user = await prisma.user.create({
      data: {
        email: "SalemElhamood@eng.suez.edu.eg",
        password: pass,
        role: "ADMIN",
      },
    });
  });

  after(async () => {
    await prisma.user.deleteMany();
  });

  it("should reject only email", () => {
    supertest(app)
      .post("/api/login")
      .send({
        email: "SalemElhamood@eng.suez.edu.eg",
      })
      .expect(401);
  });

  it("should reject only password", () => {
    supertest(app)
      .post("/api/login")
      .send({
        password: "salemHamoooood",
      })
      .expect(401);
  });

  it("should reject wrong credentials (email)", () => {
    supertest(app)
      .post("/api/login")
      .send({
        email: "SalemElhamood1@eng.suez.edu.eg",
        password: "salemHamoooood",
      })
      .expect(401);
  });

  it("should reject wrong credentials (password)", () => {
    supertest(app)
      .post("/api/login")
      .send({
        email: "SalemElhamood@eng.suez.edu.eg",
        password: "salemHamoooood123",
      })
      .expect(401);
  });

  it("should reject wrong credentials (email and password)", () => {
    supertest(app)
      .post("/api/login")
      .send({
        email: "SalemElhamood1@eng.suez.edu.eg",
        password: "salemHamoooood123",
      })
      .expect(401);
  });

  it("should login sucessfully", () => {
    supertest(app)
      .post("/api/login")
      .send({
        email: "SalemElhamood@eng.suez.edu.eg",
        password: "salemHamoooood",
      })
      .expect(200);
  });

  it("should reject forget without email", () => {
    supertest(app).post("/api/forgot_password").send({}).expect(400);
  });

  it("should reject unregistered mail", () => {
    supertest(app)
      .post("/api/forgot_password")
      .send({
        email: "unregistered@eng.suez.edu.eg",
      })
      .expect(400);
  });

  // no need to do invalid email because i do lookup in db
  it("should send link to the provided email", () => {
    supertest(app)
      .post("/api/forgot_password")
      .send({
        email: "SalemElhamood@eng.suez.edu.eg",
      })
      .expect(200);
  });

  it("should reject altered link", () => {
    supertest(app)
      .post(
        "/api/reset_password/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0MDY2MGM0LTk3MTgtNGRjYi1hNjU0LTY3NzFkYjg2ODc0MSIsImVtYWlsIjoiU2FsZW1FbGhhbW9vZEBlbmcuc3Vlei5lZHUuZWciLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2Njk5NDMwNTMsImV4cCI6MTY2OTk0Mzk1M30.UbD934NyizP0YtfzP4fdv5CfbsHwbJCUodbVeyUJEbPEs"
      )
      .send({
        password: "salemHamoooood123",
        confpassword: "salemHamoooood123",
      })
      .expect(498);
  });

  it("should reject non matching passwords", () => {
    supertest(app)
      .post(
        "/api/reset_password/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0MDY2MGM0LTk3MTgtNGRjYi1hNjU0LTY3NzFkYjg2ODc0MSIsImVtYWlsIjoiU2FsZW1FbGhhbW9vZEBlbmcuc3Vlei5lZHUuZWciLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2Njk5NDMwNTMsImV4cCI6MTY2OTk0Mzk1M30.UbD934NyizP0YtzP4fdv5CfbsHwbJCUodbVeyUJEbPE"
      )
      .send({
        password: "salemHamoooood123",
        confpassword: "khaledHamoooood",
      })
      .expect(401);
  });
});
