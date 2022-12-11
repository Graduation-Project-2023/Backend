import { Prisma } from "@prisma/client";
import prisma from "../db";

export class College {
  static get = async (id: string) => {
    const data = await prisma.college.findUnique({
      where: { id },
    });
    return data;
  };

  static getAll = async () => {
    const data = await prisma.college.findMany();
    return data;
  };

  static create = async (data: Prisma.CollegeCreateInput) => {
    const college = await prisma.college.create({
      data,
    });
    return college;
  };

  static update = async (id: string, data: Prisma.CollegeUpdateInput) => {
    const college = await prisma.college.update({
      where: { id },
      data,
    });
    return college;
  };

  static delete = async (id: string) => {
    const college = await prisma.college.delete({
      where: { id },
    });
    return college;
  };
}
