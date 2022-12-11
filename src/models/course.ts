import prisma from "../db";
import { Prisma } from "@prisma/client";

export class Course {
  static get = async (id: string) => {
    const data = await prisma.course.findUnique({
      where: { id },
    });
    return data;
  };

  static getAll = async (collegeId: string) => {
    const data = await prisma.course.findMany({
      where: {
        collegeId,
      },
      select: {
        englishName: true,
        arabicName: true,
        id: true,
      },
    });
    return data;
  };

  static create = async (data: Prisma.CourseUncheckedCreateInput) => {
    const { collegeId, ...rest } = data;
    const college = {
      connect: {
        id: collegeId as string,
      },
    };
    const course = await prisma.course.create({
      data: {
        ...rest,
        college,
      },
    });
    return course;
  };

  static update = async (id: string, data: Prisma.CourseUpdateInput) => {
    const course = await prisma.course.update({
      where: { id },
      data,
    });
    return course;
  };

  static delete = async (id: string) => {
    const course = await prisma.course.delete({
      where: { id },
    });
    return course;
  };
}
