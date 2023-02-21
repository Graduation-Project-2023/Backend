import { Student } from "../models/student";
import { User } from "../models/user";
import { getStudentInputs, getUserInputs } from "../utils/mapAdmissionData";
import { Student as StudentModel, User as UserModel } from "@prisma/client";
import { Department } from "../models/department";
import { DepartmentService } from "./department";
import { Program } from "../models/programs/program";

const entryFilter = (obj: any) => {
  if (!obj.nationalId || obj.nationalId.length != 14) {
    return false;
  }
  return true;
};

export class StudentService {
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

  static getStudentProgram = async (id: string) => {
    return await Student.getStudentProgram(id);
  };

  static setStudentProgram = async (
    id: string,
    programId: string | undefined
  ) => {
    return await Student.update(id, {
      Program: { connect: { id: programId } },
    });
  };

  static moveStudentToNextProgram = async (
    studentId: string,
    departmentId: string
  ) => {
    const student = await Student.get(studentId);
    let currProgram = await this.getStudentProgram(studentId);
    if (!currProgram) {
      const firstProgram = await DepartmentService.getDepartmentFirstProgram(
        departmentId
      );
      this.setStudentProgram(studentId, firstProgram.id);
      return;
    }

    if (
      currProgram.system === "CREDIT" &&
      student?.creditHrs &&
      currProgram.hrsToPass &&
      student.creditHrs >= currProgram.hrsToPass
    ) {
      currProgram = await Program.getNextProgram(departmentId, currProgram.id);
      this.setStudentProgram(studentId, currProgram?.id);
      return;
    }
  };

  static changeStudentDepartment = async (
    studentId: string,
    departmentId: string
  ) => {
    let currProgram = await this.getStudentProgram(studentId);
    const department = await Department.get(departmentId);

    if (!department || !currProgram) {
      this.update(studentId, {
        department: { connect: { id: departmentId } },
      });
      return;
    }

    while (
      currProgram &&
      !department.programs.some((p) => p.id === currProgram?.id)
    ) {
      currProgram = await Program.getPrerequisiteProgram(currProgram.id);
    }

    this.update(studentId, {
      department: { connect: { id: departmentId } },
      Program: { connect: { id: currProgram?.id } },
    });
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
