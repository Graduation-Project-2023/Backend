import { Course } from "../../models/course";
import { expect } from "chai";

describe("Course Model", () => {
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
