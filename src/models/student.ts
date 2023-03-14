import { Prisma, User } from "@prisma/client";
import prisma from "../db";
import { getCorrectDateFromDMY } from "../utils/date";

const createManyStudentCourses = (studentId: string, courses: any) => {
  return {
    create: courses?.map((course: any) => {
      return {
        studentId,
        instanceId: course.courseInstanceId,
      };
    }),
  };
};

const connectManyClasses = (courses: any) => {
  const classesIds = courses
    ?.reduce((acc: any, course: any) => {
      return [...acc, ...course.classes];
    }, [])
    ?.map((id: string) => ({ id }));
  return {
    connect: classesIds,
  };
};

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

  static getStudentWithAvailableCourses = async (id: string) => {
    const data = await prisma.student.findUnique({
      where: { id },
      include: {
        availableCourses: {
          select: {
            id: true,
            code: true,
            englishName: true,
            arabicName: true,
            finished: true,
            unlocked: true,
            level: {
              select: {
                id: true,
                englishName: true,
                arabicName: true,
                level: true,
              },
            },
            programCourseId: true,
          },
        },
      },
    });
    return data;
  };

  static getStudentWithDepartmentAndProgram = async (
    id: string
  ): Promise<any> => {
    const data = await prisma.student.findUnique({
      where: { id },
      include: {
        Program: {
          select: {
            id: true,
            englishName: true,
            arabicName: true,
            programCode: true,
            hrsToPass: true,
            system: true,
          },
        },
        department: {
          select: {
            id: true,
            englishName: true,
            arabicName: true,
            system: true,
          },
        },
      },
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
      programId,
      enrollmentSemesterId,
      birthDate,
      recruitmentDate,
      enrollmentYear,
      enrollmentYearEndDate,
      reserveEndDate,
      nationalId,
      departmentCode,
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
        department: {
          connect: { code: departmentCode || undefined },
        },
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

  static studentRegister = async (
    studentId: string,
    academicSemesterId: string,
    data: any
  ) => {
    const { courseInstances, ...rest } = data;
    return await prisma.studentTable.create({
      data: {
        student: {
          connect: { id: studentId },
        },
        academicSemester: {
          connect: { id: academicSemesterId },
        },
        instances: createManyStudentCourses(studentId, courseInstances),
        classes: connectManyClasses(courseInstances),
        ...rest,
      },
      include: {
        instances: true,
        classes: true,
      },
    });
  };

  static getStudentTable = async (
    studentId: string,
    academicSemesterId: string
  ) => {
    const data = await prisma.studentTable.findUnique({
      where: {
        studentId_academicSemesterId: { studentId, academicSemesterId },
      },
      include: {
        instances: true,
        classes: true,
      },
    });
    return data;
  };

  static updateStudentRegister = async (tableId: string, data: any) => {
    const { courseInstances, ...rest } = data;
    const prevClasses = await prisma.studentTable.findUnique({
      where: { id: tableId },
      select: {
        classes: {
          select: {
            id: true,
          },
        },
      },
    });
    const prevClassesIds = prevClasses?.classes?.map((c: any) => c.id);
    return await prisma.studentTable.update({
      where: { id: tableId },
      data: {
        instances: {
          deleteMany: {
            tableId,
          },
          ...createManyStudentCourses(tableId, courseInstances),
        },
        // disconnect all classes and connect the new ones
        classes: {
          disconnect: prevClassesIds,
          ...connectManyClasses(courseInstances),
        },
      },
    });
  };

  static delete = async (id: string) => {
    const student = await prisma.student.delete({
      where: { id },
    });
    return student;
  };
  id: any;
}
