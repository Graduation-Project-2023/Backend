import { expect } from "chai";
import { StudentService } from "../../services/studentService";

describe("Student service test", () => {
  it("should move student to next program", async () => {
    let student = await StudentService.moveStudentToNextProgram(studentId);
    expect(student?.programId).to.equal(programId1);
    student = await StudentService.moveStudentToNextProgram(studentId);
    expect(student?.programId).to.equal(programId2);
  });
});
