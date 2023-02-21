import { Prisma } from "@prisma/client";
import prisma from "../db";

const connectManyPrograms = (programs: any) => {
  return {
    connect: programs?.map((id: string) => ({
      id,
    })),
  };
};

export class Department {
  static get = async (id: string) => {
    const data = await prisma.department.findUnique({
      where: { id },
      select: {
        id: true,
        code: true,
        englishName: true,
        arabicName: true,
        system: true,
        programs: {
          select: {
            id: true,
          },
        },
      },
    });
    return data;
  };

  static getByCode = async (code: string) => {
    const data = await prisma.department.findUnique({
      where: { code },
      select: {
        id: true,
        programs: {
          select: {
            id: true,
          },
        },
      },
    });
    return data;
  };

  static getAll = async (collegeId: string) => {
    const data = await prisma.department.findMany({
      where: {
        collegeId,
      },
    });
    return data;
  };

  static create = async (data: any) => {
    const { collegeId, programs, ...rest } = data;
    const college = collegeId ? { connect: { id: collegeId } } : undefined;
    const department = await prisma.department.create({
      data: {
        ...rest,
        college,
        programs: connectManyPrograms(programs),
      },
    });
    return department;
  };

  static update = async (id: string, data: any) => {
    const { programs, ...rest } = data;
    if (programs) {
      await prisma.department.update({
        where: { id },
        data: {
          programs: {
            set: [],
          },
        },
      });
    }
    const department = await prisma.department.update({
      where: { id },
      data: {
        ...rest,
        programs: connectManyPrograms(programs),
      },
    });
    return department;
  };

  static delete = async (id: string) => {
    const department = await prisma.department.delete({
      where: { id },
    });
    return department;
  };
}
