import { Prisma, User } from "@prisma/client";
import prisma from "../db";
import { Student as StudentModel, User as UserModel } from "@prisma/client";
import bcrypt from "bcrypt";
import { getCorrectDateFromDMY } from "../utils/date";

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
        birthDate: birthDate ? getCorrectDateFromDMY(birthDate) : undefined,
        recruitmentDate: recruitmentDate
          ? new Date(recruitmentDate)
          : undefined,
        enrollmentYear: enrollmentYear
          ? getCorrectDateFromDMY(enrollmentYear)
          : undefined,
        enrollmentYearEndDate: enrollmentYearEndDate
          ? getCorrectDateFromDMY(enrollmentYearEndDate)
          : undefined,
        reserveEndDate: reserveEndDate
          ? getCorrectDateFromDMY(reserveEndDate)
          : undefined,
        ...studentData,
      },
    });
    return student;
  };

  static update = async (id: string, data: Prisma.StudentUpdateInput) => {
    const {
      birthDate,
      recruitmentDate,
      enrollmentYear,
      enrollmentYearEndDate,
      reserveEndDate,
      ...studentData
    } = data;

    const student = await prisma.student.update({
      where: { id },
      data: {
        ...studentData,
        birthDate: birthDate
          ? getCorrectDateFromDMY(birthDate as string)
          : undefined,
        recruitmentDate: recruitmentDate
          ? new Date(recruitmentDate as string)
          : undefined,
        enrollmentYear: enrollmentYear
          ? getCorrectDateFromDMY(enrollmentYear as string)
          : undefined,
        enrollmentYearEndDate: enrollmentYearEndDate
          ? getCorrectDateFromDMY(enrollmentYearEndDate as string)
          : undefined,
        reserveEndDate: reserveEndDate
          ? getCorrectDateFromDMY(reserveEndDate as string)
          : undefined,
      },
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
