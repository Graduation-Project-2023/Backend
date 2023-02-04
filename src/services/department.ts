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
  for (const program of programs) {
    // validate system of programs and department
    if (program.system !== department.system) {
      return false;
    }
    // validate all prerequisite programs of programs are in the department
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
}
