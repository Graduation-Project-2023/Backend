import { Student } from "../models/student";
import { User } from "../models/user";
import { getStudentInputs, getUserInputs } from "../utils/mapAdmissionData";

const entryFilter = (obj: any) => {
  if (!obj.nationalId || obj.nationalId.length != 14) {
    return false;
  }
  return true;
};

export class AdmissionService {
  static createMany = async (collegeId: string, jsonData: any[]) => {
    const filteredData = jsonData.filter(entryFilter);
    const usersInputs = getUserInputs(filteredData);
    await User.createMany(usersInputs);
    const studentsInputs = getStudentInputs(filteredData, collegeId);
    await Student.createMany(studentsInputs);
  };
}
