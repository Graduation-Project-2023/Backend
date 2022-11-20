import { StudentRepo } from "../../db/studentRepo";
import { UserRepo } from "../../db/userRepo";
import { FormRepo } from "../../db/formRepo";
import { expect } from "chai";

describe("studentRepo crud", () => {
  let studentRepo: StudentRepo;
  let formRepo: FormRepo;
  let formId: string;
  let student: any;

  // should delete all forms after all tests are done
  after(async () => {
    await studentRepo.deleteMany();
    await formRepo.deleteMany();
  });

  before(async () => {
    formRepo = new FormRepo();
    const form = await formRepo.create({
      arabicName: "حمود الحمود",
      englishName: "Hammoud Hammoud",
      nationality: "Saudi",
      nationalId: "123456789",
      gender: "MALE",
      religion: "MUSLIM",
      birthDate: new Date("1990-01-01"),
      birthPlace: "Riyadh",
      guardianName: "حمود الحمود",
      address: "Riyadh",
      contactEmail: "HamoodElHamood@gmail.com",
      contactPhone: "123456789",
      homePhone: "064567890",
      city: "Riyadh",
    });
    formId = form.id;
  });

  it("should be defined", () => {
    studentRepo = new StudentRepo();
    expect(studentRepo).to.be.ok;
  });

  it("should create a student", async () => {
    student = await studentRepo.create({
      user: {
        email: "Hamood@gmail.com",
        password: "123456789",
        role: "STUDENT",
      },
      formId,
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
