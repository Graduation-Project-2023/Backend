import { Prisma } from "@prisma/client";
import prisma from "../db";
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

  static create = async (data: any) => {
    const {
      email,
      password,
      collegeId,
      birthDate,
      recruitmentDate,
      enrollmentYear,
      enrollmentYearEndDate,
      reserveEndDate,
      ...studentData
    } = data;
    const student = await prisma.student.create({
      data: {
        user: {
          create: {
            email,
            password,
            role: "STUDENT",
          },
        },
        college: {
          connect: {
            id: collegeId,
          },
        },
        birthDate: new Date(birthDate || null),
        recruitmentDate: new Date(recruitmentDate || null),
        enrollmentYear: new Date(enrollmentYear || null),
        enrollmentYearEndDate: new Date(enrollmentYearEndDate || null),
        reserveEndDate: new Date(reserveEndDate || null),
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
