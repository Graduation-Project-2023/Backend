import { Course } from "../../models/course";
import { College } from "../../models/college";
import { expect } from "chai";
import prisma from "../../db";

describe("Course Model", () => {
  let collegeId: string;

  after(async () => {
    await prisma.course.deleteMany();
    await prisma.college.deleteMany();
  });

  before(async () => {
    const college = await College.create({
      englishName: "Arts",
      arabicName: "الفنون",
    });
    collegeId = college.id;
  });

  it("tests create course", async () => {
    const course = await Course.create({
      englishName: "Computer Science",
      arabicName: "علوم الحاسب",
      collegeId,
      id: "BSM01",
    });
    expect(course).to.have.property("id");
  });

  it("tests get course", async () => {
    const course = await Course.get("BSM01");
    expect(course).to.have.property("id");
    expect(course?.collegeId).to.equal(collegeId);
  });

  it("tests get all courses", async () => {
    const courses = await Course.getAll(collegeId);
    expect(courses.length).to.be.greaterThan(0);
  });

  it("tests update course", async () => {
    const course = await Course.update("BSM01", {
      englishName: "Computer Science",
      arabicName: "علوم الحاسب",
    });
    expect(course).to.have.property("id");
    expect(course?.collegeId).to.equal(collegeId);
  });
});
