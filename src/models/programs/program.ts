import { Prisma } from "@prisma/client";
import prisma from "../../db";

export class Program {
  static get = async (id: string) => {
    const data = await prisma.program.findUnique({
      where: { id },
    });
    return data;
  };

  static getAll = async (filter: Prisma.ProgramWhereInput) => {
    const data = await prisma.program.findMany({
      where: filter,
      select: {
        id: true,
        englishName: true,
        arabicName: true,
        programCode: true,
        system: true,
        maxGrade: true,
        levels: {
          select: {
            id: true,
            englishName: true,
            arabicName: true,
            level: true,
          },
        },
        prerequisiteProgram: {
          select: {
            id: true,
            englishName: true,
            arabicName: true,
            programCode: true,
          },
        },
      },
    });
    return data;
  };

  static create = async (data: any) => {
    const { collegeId, prerequisiteProgramId, ...rest } = data;
    const prerequisiteProgram = prerequisiteProgramId
      ? {
          connect: {
            id: prerequisiteProgramId as string,
          },
        }
      : undefined;
    const college = {
      connect: {
        id: collegeId as string,
      },
    };
    const program = await prisma.program.create({
      data: {
        ...rest,
        college,
        prerequisiteProgram,
      },
    });
    return program;
  };

  static update = async (id: string, data: any) => {
    const program = await prisma.program.update({
      where: { id },
      data,
    });
    return program;
  };

  static delete = async (id: string) => {
    const program = await prisma.program.delete({
      where: { id },
    });
    return program;
  };

  static getPrerequisiteProgram = async (id: string) => {
    const data = await prisma.program.findUnique({
      where: { id },
      select: {
        prerequisiteProgram: {
          select: {
            id: true,
            englishName: true,
            arabicName: true,
            programCode: true,
            hrsToPass: true,
            system: true,
          },
        },
      },
    });
    return data?.prerequisiteProgram;
  };

  static getNextProgram = async (departmentId: string, programId: string) => {
    const data = await prisma.program.findMany({
      where: {
        departments: {
          some: {
            id: departmentId,
          },
        },
        prerequisiteProgramId: programId,
      },
      select: {
        id: true,
        englishName: true,
        arabicName: true,
        programCode: true,
        hrsToPass: true,
        system: true,
      },
    });
    return data[0];
  };

  static getFirstProgram = async (departmentId: string) => {
    const data = await prisma.program.findMany({
      where: {
        departments: {
          some: {
            id: departmentId,
          },
        },
        prerequisiteProgramId: null,
      },
      select: {
        id: true,
        englishName: true,
        arabicName: true,
        programCode: true,
      },
    });
    return data[0];
  };
}
