import { Prisma } from "@prisma/client";
// 2:35 for 10000 students
// 2:46 for 10000 students with full data
// 1:15 for 5000 students with full data
// 0:14 for 1000 students with full data
const mapCsvRowToStudentCreateInput = async (
  obj: any
): Promise<Prisma.StudentCreateInput | null> => {
  const studentInput: any = {
    nationalId: obj.nationalId,
  };
  studentInput.email = `${obj.nationalId}@eng.suez.edu.eg` || obj.email;
  studentInput.password = obj.nationalId;
  // studentInput.role = "STUDENT";
  studentInput.englishName = obj.englishName;
  studentInput.arabicName = obj.arabicName;
  studentInput.nationality = obj.nationality;
  studentInput.gender = obj.gender?.includes("ذ") ? "MALE" : "FEMALE";
  studentInput.religion = obj.religion?.includes("مسلم")
    ? "MUSLIM"
    : "CHRISTIAN";
  studentInput.birthDate = obj.birthDate ? new Date(obj.birthDate) : undefined;
  studentInput.birthPlace = obj.birthPlace;
  studentInput.guardianName = obj.guardianName;
  studentInput.contactPhone = obj.contactPhone;
  studentInput.homePhone = obj.homePhone;
  studentInput.address = obj.address;
  studentInput.schoolSeatId = obj.schoolSeatId;
  studentInput.schoolMarks = obj.schoolMarks;
  studentInput.enrollmentYear = obj.enrollmentYear
    ? new Date(obj.enrollmentYear)
    : undefined;
  studentInput.PreviousQualification = obj.PreviousQualification;
  studentInput.TotalPreviousQualification = obj.TotalPreviousQualification;
  studentInput.InstitutePreviousQualification =
    obj.InstitutePreviousQualification;
  studentInput.directorate = obj.directorate;

  return studentInput;
};

export default mapCsvRowToStudentCreateInput;
