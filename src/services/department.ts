import { Department } from "../models/department";
import { Program } from "../models/programs/program";
import {
  Prisma,
  Department as prismaDepartment,
  Program as prismaProgram,
} from "@prisma/client";

const getPrograms = async (programs: string[]) => {
  const data = await Program.getAll({
    id: {
      in: programs,
    },
  });
  return data;
};

const validatePrograms = (
  programs: any[],
  department: Prisma.Without<prismaDepartment, "collegeId">
) => {
  const programIds = programs.map((program) => program.id);
  // validate only one program has no prerequisite
  if (programs.filter((program) => !program.prerequisiteProgram).length !== 1) {
    return false;
  }
  for (const program of programs) {
    // validate system of programs and department
    // if (program.system !== department.system) {
    //   return false;
    // }
    // // validate all prerequisite programs of programs are in the department
    if (
      program.prerequisiteProgram &&
      !programIds.includes(program.prerequisiteProgram.id)
    ) {
      return false;
    }
  }
  return true;
};

export class DepartmentService {
  static async getAll(collegeId: string) {
    const data = await Department.getAll(collegeId);
    return data;
  }

  static async create(
    data: Prisma.Without<prismaDepartment, "id"> & {
      programs: string[];
    }
  ) {
    const { programs, collegeId, ...rest } = data;
    const programsData = await getPrograms(programs);
    if (!validatePrograms(programsData, rest)) {
      throw new Error("Invalid programs");
    }
    const department = await Department.create(data);
    return department;
  }

  static async get(id: string) {
    const data = await Department.get(id);
    return data;
  }

  static async update(
    id: string,
    data: Prisma.Without<prismaDepartment, "id"> & {
      programs: string[];
    }
  ) {
    const { programs, ...rest } = data;
    const programsData = await getPrograms(programs);
    if (programs && !validatePrograms(programsData, rest)) {
      throw new Error("Invalid programs");
    }
    const department = await Department.update(id, data);
    return department;
  }

  static async delete(id: string) {
    const department = await Department.delete(id);
    return department;
  }

  static async getDepartmentNextProgram(
    departmentId: string,
    programId: string
  ) {
    const nextProgram = await Program.getNextProgram(departmentId, programId);
    return nextProgram;
  }

  static async getDepartmentAdmission(departmentId: string) {
    // return department code and first program of department
    const department = await Department.getAdmission(departmentId);
    return department;
  }

  static async getDepartmentFirstProgram(departmentId: string) {
    const firstProgram = await Program.getFirstProgram(departmentId);
    return firstProgram;
  }
}
