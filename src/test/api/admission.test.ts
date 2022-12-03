import supertest from "supertest";
import app from "../../server";
import { expect } from "chai";
import { StudentRepo } from "../../db/studentRepo";
import { UserRepo } from "../../db/userRepo";

const request = supertest(app);
const csvApi = "/api/csv_upload";
const studentRepo = new StudentRepo();
const userRepo = new UserRepo();

describe("test the admission routes", () => {
  after(async () => {
    await studentRepo.deleteMany();
    await userRepo.deleteMany();
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
      .post(csvApi)
      .attach("csv", "src/test/assets/users1.csv");
    expect(response.status).to.equal(201);
    expect(response.text).to.equal("OK");
  });

  it("tests the create student route", async () => {
    const response = await request.post("/api/create_student").send({
      email: "Hamood@eng.suez.edu.eg",
      password: "123456",
      englishName: "Salem El Hamood",
      arabicName: "سالم الحمود",
      nationality: "Saudi",
      nationalId: "12345278901234",
      gender: "MALE",
      religion: "MUSLIM",
      birthDate: new Date("1999-01-01"),
      birthPlace: "Riyadh",
      collegeId: "1",
      guardianName: "Hamood El Hamood",
      address: "Hamood El Hamood street, Riyadh, Saudi Arabia",
      contactPhone: "+964 770 123 4567",
      homePhone: "0643217123",
    });
    expect(response.status).to.equal(500);
  });

  // it("reject request without csv", () => {
  //   supertest(app).post("/api/csv_upload").attach("csv", "").expect(400);
  // });
  //   it("hello world", () => {
  //     supertest(app).get("/api/hello").expect(400);
  //     supertest(app).get("/api/hello").expect("hello world");
  //   });
  //   it("reject wrong extension", () => {
  //     supertest(app)
  //       .post("/api/csv_upload")
  //       .attach("csv", "src/test/assets/users.txt")
  //       .expect(400);
  //   });
  //   it("reject csv with wrong headers", () => {
  //     supertest(app)
  //       .post("/api/csv_upload")
  //       .attach("csv", "src/test/assets/xheaders.csv")
  //       .expect(400);
  //   });
  //   it("should create legit users from csv", () => {
  //     supertest(app)
  //       .post("/api/csv_upload")
  //       .attach("csv", "src/test/assets/users1.csv")
  //       .expect(200);
  //   });
  //   it("should create legit users from full csv", () => {
  //     supertest(app)
  //       .post("/api/csv_upload")
  //       .attach("csv", "src/test/assets/right.csv")
  //       .expect(200);
  //   });
  //   it("test the create route with invalidId", () => {
  //     supertest(app)
  //       .post("api/create_user")
  //       .send({
  //         englishName: "Salem El Hamood",
  //         arabicName: "سالم الحمود",
  //         nationality: "Saudi",
  //         nationalId: "123456789",
  //         gender: "ذكر",
  //         religion: "مسلم",
  //         birthDate: "1999-01-01",
  //         birthPlace: "Riyadh",
  //         guardianName: "Hamood El Hamood",
  //         address: "Hamood El Hamood street, Riyadh, Saudi Arabia",
  //         contactPhone: "+964 770 123 4567",
  //         homePhone: "0643217123",
  //       })
  //       .expect(400);
  //   });
  //   it("test the create route with validId", () => {
  //     supertest(app)
  //       .post("api/create_user")
  //       .send({
  //         englishName: "Salem El Hamood",
  //         arabicName: "سالم الحمود",
  //         nationality: "Saudi",
  //         nationalId: "12345678901234",
  //         gender: "ذكر",
  //         religion: "مسلم",
  //         birthDate: "1999-01-01",
  //         birthPlace: "Riyadh",
  //         guardianName: "Hamood El Hamood",
  //         address: "Hamood El Hamood street, Riyadh, Saudi Arabia",
  //         contactPhone: "+964 770 123 4567",
  //         homePhone: "0643217123",
  //       })
  //       .expect(200);
  //   });
});
