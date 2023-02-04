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

  static update = async (id: string, data: Prisma.DepartmentUpdateInput) => {
    const department = await prisma.department.update({
      where: { id },
      data,
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
