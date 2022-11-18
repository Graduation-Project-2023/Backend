import { StudentRepo } from "../../db/studentRepo";
import { UserRepo } from "../../db/userRepo";
import { expect } from "chai";

describe("studentRepo crud", () => {
  let studentRepo: StudentRepo;
  let student: any;
  let userId: string;

  // should delete all forms after all tests are done
  after(async () => {
    await studentRepo.deleteMany();
  });

  before(async () => {
    const userRepo = new UserRepo();
    const user = await userRepo.create({
      email: "hamood@student.com",
      password: "123456789",
      role: "STUDENT",
    });
    userId = user.id;
  });

  it("should be defined", () => {
    studentRepo = new StudentRepo();
    expect(studentRepo).to.be.ok;
  });

  it("should create a student", async () => {
    student = await studentRepo.create({
      userId,
      englishName: "Hamood",
      arabicName: "حمود",
      nationalId: "123456789",
      nationality: "Jordanian",
      gender: "MALE",
      religion: "MUSLIM",
      birthDate: new Date("1999-01-01"),
      birthPlace: "Amman",
      address: "Amman",
      contactEmail: "Hamood@student.com",
      guardianName: "Hamood",
      city: "Amman",
      contactPhone: "0799999999",
    });
    expect(student).to.be.ok;
    expect(student.id).to.be.ok;
  });

  it("should read a student", async () => {
    const newStudent = await studentRepo.read({ id: student.id });
    expect(newStudent).to.be.ok;
    expect(newStudent.id).to.equal(student.id);
    expect(newStudent.englishName).to.equal(student.englishName);
  });
});
