import { Prisma, User } from "@prisma/client";
import prisma from "../db";
import { Student as StudentModel, User as UserModel } from "@prisma/client";
import bcrypt from "bcrypt";

export class Student {
  static getAll = async (collegeId: string) => {
    const data = await prisma.student.findMany({
      where: { collegeId },
    });
    return data;
  };

  static get = async (id: string) => {
    const data = await prisma.student.findUnique({
      where: { id },
    });
    return data;
  };

  static createMany = async (data: Prisma.StudentCreateManyInput[]) => {
    const students = await prisma.student.createMany({
      data,
    });
    return students;
  };

  static create = async (data: StudentModel & UserModel) => {
    const {
      email,
      password,
      collegeId,
      programId,
      enrollmentSemesterId,
      birthDate,
      recruitmentDate,
      enrollmentYear,
      enrollmentYearEndDate,
      reserveEndDate,
      nationalId,
      ...studentData
    } = data;
    const student = await prisma.student.create({
      data: {
        college: {
          connect: { id: collegeId || undefined },
        },
        user: {
          create: {
            email,
            password,
            nationalId,
            role: "STUDENT",
          },
        },
        birthDate: new Date(birthDate || ""),
        recruitmentDate: new Date(recruitmentDate || ""),
        enrollmentYear: new Date(enrollmentYear || ""),
        enrollmentYearEndDate: new Date(enrollmentYearEndDate || ""),
        reserveEndDate: new Date(reserveEndDate || ""),
        ...studentData,
      },
    });
    return student;
  };

  static update = async (id: string, data: Prisma.StudentUpdateInput) => {
    const student = await prisma.student.update({
      where: { id },
      data,
    });
    return student;
  };

  static delete = async (id: string) => {
    const student = await prisma.student.delete({
      where: { id },
    });
    return student;
  };
}
