import { Prisma } from "@prisma/client";


export const mapCsvRowToStudentCreateInput = (
  obj: Prisma.StudentCreateManyInput & Prisma.UserCreateManyInput
): Prisma.StudentCreateManyInput & Prisma.UserCreateManyInput => {
  const studentInput = {
    ...obj,
  };
  studentInput.gender = obj.gender?.includes("ذ") ? "MALE" : "FEMALE";
  studentInput.religion = obj.religion?.includes("مسلم")
    ? "MUSLIM"
    : "CHRISTIAN";
  studentInput.birthDate = obj.birthDate ? new Date(obj.birthDate) : undefined;
  studentInput.recruitmentDate = obj.recruitmentDate
    ? new Date(obj.recruitmentDate)
    : undefined;
  studentInput.enrollmentYear = obj.enrollmentYear
    ? new Date(obj.enrollmentYear)
    : undefined;
  studentInput.enrollmentYearEndDate = obj.enrollmentYearEndDate
    ? new Date(obj.enrollmentYearEndDate)
    : undefined;
  studentInput.reserveEndDate = obj.reserveEndDate
    ? new Date(obj.reserveEndDate)
    : undefined;
  return studentInput;
};

export const mapCsvRowToUserCreateInput = (
  obj: Prisma.StudentCreateManyInput & Prisma.UserCreateManyInput
): Prisma.UserCreateManyInput => {
  const email = `${obj.nationalId}@eng.suez.edu.eg` || obj.email;
  const password = obj.password || obj.nationalId;
  const nationalId = obj.nationalId;
  return {
    email,
    password,
    nationalId,
    role: "STUDENT",
  };
};

export const getUserInputs = (jsonData: any[]) =>
  jsonData.map((obj) => mapCsvRowToUserCreateInput(obj));

export const getStudentInputs = (jsonData: any[], collegeId: string) =>
  jsonData.map((obj) => {
    const studentInput = mapCsvRowToStudentCreateInput(obj);
    studentInput.collegeId = collegeId;
    return studentInput;
  });
