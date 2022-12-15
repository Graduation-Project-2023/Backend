import prisma from "../db";

export class AcademicSemester {
  static get = async (id: string) => {
    const data = await prisma.academicSemester.findUnique({
      where: { id },
    });
    return data;
  };

  static getAll = async () => {
    const data = await prisma.academicSemester.findMany();
    return data;
  };

  static create = async (data: any) => {
    const academicSemester = await prisma.academicSemester.create({
      data,
    });
    return academicSemester;
  };
}
