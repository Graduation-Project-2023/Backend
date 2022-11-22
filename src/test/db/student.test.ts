import { StudentRepo } from "../../db/studentRepo";
import { UserRepo } from "../../db/userRepo";
import { expect } from "chai";
import { prisma } from "@prisma/client";

describe("studentRepo crud", () => {
  let studentRepo: StudentRepo;
  let userRepo: UserRepo;
  let student: any;

  // should delete all forms after all tests are done
  after(async () => {
    await studentRepo.deleteMany();
    await userRepo.deleteMany();
  });

  before(async () => {
    studentRepo = new StudentRepo();
    userRepo = new UserRepo();
  });

  it("should create a student", async () => {
    student = await studentRepo.create({
      user: {
        create: {
          email: "HamoodElhamood@gmail.com",
          password: "123456789",
          role: "STUDENT",
        },
      },
      englishName: "Hammoud Hammoud",
      arabicName: "حمود الحمود",
      nationality: "Saudi",
      nationalId: "123456789",
      gender: "MALE",
      religion: "MUSLIM",
      birthDate: new Date("1990-01-01"),
      birthPlace: "Riyadh",
      guardianName: "حمود الحمود",
      address: "Riyadh",
      contactPhone: "123456789",
      homePhone: "064567890",
    });
  });

  it("should read a student", async () => {
    const newStudent = await studentRepo.read({ id: student.id });
    expect(newStudent).to.be.ok;
    expect(newStudent.id).to.equal(student.id);
    expect(newStudent.englishName).to.equal(student.englishName);
  });

  it("should read many students", async () => {
    const students = await studentRepo.readMany();
    expect(students).to.be.ok;
    // expect length to be one
    expect(students.length).to.equal(1);
  });
});
