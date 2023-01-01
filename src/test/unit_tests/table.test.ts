import { checkOverlapping, validateTable } from "../../services/classesTable";
import { expect } from "chai";
import { Class } from "@prisma/client";

const classError: Class = {
  id: "1",
  day: "MONDAY",
  group: null,
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
  group: "A",
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

const class11: Class = {
  id: "1",
  day: "MONDAY",
  group: "B",
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

const class12: Class = {
  id: "1",
  day: "MONDAY",
  group: "A",
  startPeriod: 1,
  endPeriod: 2,
  classType: "SECTION",
  courseInstanceId: "1",
  professorId: "1",
  englishName: "englishName",
  arabicName: "arabicName",
  tableId: "1",
  startDate: null,
  endDate: null,
};

const class13: Class = {
  id: "1",
  day: "MONDAY",
  group: "B",
  startPeriod: 1,
  endPeriod: 2,
  classType: "SECTION",
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
  group: null,
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
  group: "A",
  startPeriod: 5,
  endPeriod: 7,
  classType: "LAB",
  courseInstanceId: "2",
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
  group: "B",
  startPeriod: 3,
  endPeriod: 4,
  classType: "LAB",
  courseInstanceId: "2",
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
  group: "C",
  startPeriod: 3,
  endPeriod: 4,
  classType: "LAB",
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
  hasLectureGroups: true,
  lectureGroupCount: 2,
  sectionGroupCount: 2,
  labGroupCount: 0,
};

const courseInstance2 = {
  id: "2",
  labCount: 1,
  hasLectureGroups: false,
  lectureGroupCount: 0,
  lectureCount: 1,
  sectionGroupCount: 3,
  labGroupCount: 3,
};

describe("Table unit tests", () => {
  it("checkOverlapping function test", () => {
    const classesTable: Class[] = [class1, class2, classError];
    expect(checkOverlapping(classesTable)).to.equal(false);
    const classesTable2: Class[] = [class1, class3, class4];
    expect(checkOverlapping(classesTable2)).to.equal(true);
  });

  it("valid table tests", () => {
    const classesTable: Class[] = [
      class1,
      class11,
      class12,
      class13,
      class2,
      class3,
      class4,
      class5,
    ];
    const courseInstances = [courseInstance1, courseInstance2];
    expect(validateTable(courseInstances, classesTable).valid).to.equal(true);

    const classesTable2: Class[] = [class2];
    expect(validateTable(courseInstances, classesTable2).valid).to.equal(true);
  });

  it("invalid table tests", () => {
    const classesTable: Class[] = [class1];
    const courseInstances = [courseInstance1, courseInstance2];
    const result = validateTable(courseInstances, classesTable);
    expect(result.valid).to.equal(false);
    expect(result.type).to.equal("lecture");

    const classesTable2: Class[] = [class2, class3, class4];
    const result2 = validateTable(courseInstances, classesTable2);
    expect(result2.valid).to.equal(false);
    expect(result2.type).to.equal("lab or section");
  });

  // it("checkClassCount function test", () => {
  //   const classTable: Class[] = [class1, class2, class3, class4, class5];
  //   const courseInstances = [courseInstance1, courseInstance2];
  //   expect(checkClassCount(classTable, courseInstances)).to.equal(true);
  //   const classTable2: Class[] = [class1, class2, class3, class4, classError];
  //   expect(checkClassCount(classTable2, courseInstances)).to.equal(false);
  // });

  // it("validateClassesTable function test", () => {
  //   const classTable: Class[] = [class1, class2, class3, class4, class5];
  //   const courseInstances = [courseInstance1, courseInstance2];
  //   expect(validateClassesTable(classTable, courseInstances)).to.equal(true);
  //   const classTable2: Class[] = [class1, class2, class3, class4, classError];
  //   expect(validateClassesTable(classTable2, courseInstances)).to.equal(false);
  // });
});
