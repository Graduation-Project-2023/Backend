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
  static createMany = async (
    collegeId: string,
    departmentId: string,
    jsonData: any[]
  ) => {
    const filteredData = jsonData.filter(entryFilter);
    const usersInputs = getUserInputs(filteredData);
    let departmentCode;
    let programId;
    await User.createMany(usersInputs);
    if (departmentId) {
      const department = await Department.getAdmission(departmentId);
      departmentCode = department?.code;
      programId = department?.programs[0]?.id;
    }
    const studentsInputs = getStudentInputs(
      filteredData,
      collegeId,
      departmentCode,
      programId
    );
    await Student.createMany(studentsInputs);
  };

  static get = async (id: string) => {
    return await Student.get(id);
  };

  static setStudentProgram = async (
    id: string,
    programId: string | undefined
  ) => {
    return await Student.update(id, {
      Program: { connect: { id: programId } },
    });
  };

  static moveStudentToNextProgram = async (studentId: string) => {
    const student = await Student.getStudentWithDepartmentAndProgram(studentId);
    let currProgram = student?.Program;
    const departmentId = student?.department?.id;

    if (!currProgram) {
      const firstProgram = await DepartmentService.getDepartmentFirstProgram(
        departmentId
      );
      return await this.setStudentProgram(studentId, firstProgram.id);
    }

    if (
      currProgram.system === "CREDIT" &&
      student?.creditHrs &&
      currProgram.hrsToPass &&
      student.creditHrs >= currProgram.hrsToPass
    ) {
      currProgram = await Program.getNextProgram(departmentId, currProgram.id);
      if (currProgram?.id) {
        return await this.setStudentProgram(studentId, currProgram?.id);
      }
    }
    return student;
  };

  static changeStudentDepartment = async (
    studentId: string,
    departmentId: string
  ) => {
    const student = await Student.getStudentWithDepartmentAndProgram(studentId);
    let currProgram = student?.Program;
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
