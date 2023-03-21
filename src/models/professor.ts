import { Prisma } from "@prisma/client";
import prisma from "../db";
import bcrypt from "bcrypt";

export class Professor {
  static getAll = async (collegeId: string) => {
    const data = await prisma.professor.findMany({
      where: { collegeId },
    });
    return data;
  };

  static get = async (id: string) => {
    const data = await prisma.professor.findUnique({
      where: { id },
    });
    return data;
  };

  static create = async (data: any) => {
    const { email, password, collegeId, nationalId, departmentId, ...professorData } = data;
    const professor = await prisma.professor.create({
      data: {
        user: {
          create: {
            email,
            password: await bcrypt.hash(password + process.env.PEPPER, 10),
            nationalId,
            role: "PROFESSOR",
          },
        },
        college: {
          connect: {
            id: collegeId,
          },
        },
        department: {
          connect: {
            id: departmentId,
        },
      },
        ...professorData,
      },
    });
    return professor;
  };

  static update = async (id: string, data: Prisma.ProfessorUpdateInput) => {
    const professor = await prisma.professor.update({
      where: { id },
      data,
    });
    return professor;
  };

  static delete = async (id: string) => {
    const professor = await prisma.professor.delete({
      where: { id },
    });
    return professor;
  };
}
