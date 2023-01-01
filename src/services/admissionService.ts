import { Student } from "../models/student";
import { User } from "../models/user";
import { getStudentInputs, getUserInputs } from "../utils/mapAdmissionData";
import { Student as StudentModel, User as UserModel } from "@prisma/client";

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

  static get = async (id: string) => {
    return await Student.get(id);
  };

  static getAll = async (collegeId: string) => {
    return await Student.getAll(collegeId);
  };

  static create = async (data: StudentModel & UserModel) => {
    return await Student.create(data);
  };

  static update = async (id: string, data: any) => {
    return await Student.update(id, data);
  };

  static delete = async (id: string) => {
    return await Student.delete(id);
  };
}
