import {
  checkOverlapping,
  checkClassCount,
  validateClassesTable,
} from "../../services/classesTable";
import { expect } from "chai";
import { Class } from "@prisma/client";

const classError: Class = {
  id: "1",
  day: "MONDAY",
  startPeriod: 2,
  endPeriod: 3,
  classType: "LECTURE",
  courseInstanceId: "1",
  professorId: "1",
  englishName: "englishName",
  arabicName: "arabicName",
  tableId: "1",
  startDate: null,
  endDate: null,
};

const class1: Class = {
  id: "1",
  day: "MONDAY",
  startPeriod: 1,
  endPeriod: 2,
  classType: "LECTURE",
  courseInstanceId: "1",
  professorId: "1",
  englishName: "englishName",
  arabicName: "arabicName",
  tableId: "1",
  startDate: null,
  endDate: null,
};

const class2: Class = {
  id: "2",
  day: "MONDAY",
  startPeriod: 3,
  endPeriod: 4,
  classType: "LECTURE",
  courseInstanceId: "2",
  professorId: "1",
  englishName: "englishName",
  arabicName: "arabicName",
  tableId: "1",
  startDate: null,
  endDate: null,
};

const class3: Class = {
  id: "3",
  day: "MONDAY",
  startPeriod: 5,
  endPeriod: 7,
  classType: "LAB",
  courseInstanceId: "1",
  professorId: "1",
  englishName: "englishName",
  arabicName: "arabicName",
  tableId: "1",
  startDate: null,
  endDate: null,
};

const class4: Class = {
  id: "4",
  day: "SUNDAY",
  startPeriod: 3,
  endPeriod: 4,
  classType: "SECTION",
  courseInstanceId: "1",
  professorId: "1",
  englishName: "englishName",
  arabicName: "arabicName",
  tableId: "1",
  startDate: null,
  endDate: null,
};

const class5: Class = {
  id: "5",
  day: "SUNDAY",
  startPeriod: 3,
  endPeriod: 4,
  classType: "SECTION",
  courseInstanceId: "2",
  professorId: "1",
  englishName: "englishName",
  arabicName: "arabicName",
  tableId: "1",
  startDate: null,
  endDate: null,
};

const courseInstance1 = {
  id: "1",
  lectureCount: 1,
  labCount: 2,
};

const courseInstance2 = {
  id: "2",
  lectureCount: 1,
  labCount: 1,
};

describe("Table unit tests", () => {
  it("checkOverlapping function test", () => {
    const classesTable: Class[] = [class1, class2, classError];
    expect(checkOverlapping(classesTable)).to.equal(false);
    const classesTable2: Class[] = [class1, class3, class4];
    expect(checkOverlapping(classesTable2)).to.equal(true);
  });

  it("checkClassCount function test", () => {
    const classTable: Class[] = [class1, class2, class3, class4, class5];
    const courseInstances = [courseInstance1, courseInstance2];
    expect(checkClassCount(classTable, courseInstances)).to.equal(true);
    const classTable2: Class[] = [class1, class2, class3, class4, classError];
    expect(checkClassCount(classTable2, courseInstances)).to.equal(false);
  });

  it("validateClassesTable function test", () => {
    const classTable: Class[] = [class1, class2, class3, class4, class5];
    const courseInstances = [courseInstance1, courseInstance2];
    expect(validateClassesTable(classTable, courseInstances)).to.equal(true);
    const classTable2: Class[] = [class1, class2, class3, class4, classError];
    expect(validateClassesTable(classTable2, courseInstances)).to.equal(false);
  });
});
