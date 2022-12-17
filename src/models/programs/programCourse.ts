import prisma from "../../db";
import { Course } from "../course";

const connectManyPrerequisites = (prerequisites: any) => {
  return {
    connect: prerequisites?.map((id: string) => ({
      id,
    })),
  };
};

const prerequisitesInclude = {
  prerequisites: {
    select: {
      id: true,
      code: true,
      englishName: true,
      arabicName: true,
    },
  },
};

export class ProgramCourse {
  static get = async (id: string) => {
    const data = await prisma.programCourse.findUnique({
      where: { id },
      include: {
        ...prerequisitesInclude,
      },
    });
    return data;
  };

  static getByCode = async (code: string, programId: string) => {
    const data = await prisma.programCourse.findUnique({
      where: {
        programId_code: {
          code,
          programId,
        },
      },
      include: {
        ...prerequisitesInclude,
      },
    });
    return data;
  };

  static getAll = async (programId: string) => {
    const data = await prisma.programCourse.findMany({
      where: {
        programId,
      },
      select: {
        id: true,
        code: true,
        englishName: true,
        arabicName: true,
        semester: true,
        levelId: true,
        creditHours: true,
      },
    });
    return data;
  };

  static create = async (data: any) => {
    const { programId, levelId, code, prerequisites, ...rest } = data;
    const level = levelId ? { connect: { id: levelId } } : undefined;
    const program = programId ? { connect: { id: programId } } : undefined;
    if (!programId) throw new Error("Program not found");

    // set course names from course table if not provided
    const courseData = await Course.get(code);
    if (!courseData) throw new Error("Course not found");
    rest.englishName = rest.englishName
      ? rest.englishName
      : courseData.englishName;
    rest.arabicName = rest.arabicName ? rest.arabicName : courseData.arabicName;
    const course = {
      connect: {
        id: courseData.id,
      },
    };

    const programCourse = await prisma.programCourse.create({
      data: {
        course,
        level,
        program,
        prerequisites: connectManyPrerequisites(prerequisites),
        ...rest,
      },
    });
    return programCourse;
  };

  static update = async (id: string, data: any) => {
    const { levelId, prerequisites, ...rest } = data;
    const level = levelId ? { connect: { id: levelId } } : undefined;

    // if prerequisites are provided, disconnect all and connect new ones
    if (prerequisites) {
      await prisma.programCourse.update({
        where: { id },
        data: {
          prerequisites: {
            set: [],
          },
        },
      });
    }

    const programCourse = await prisma.programCourse.update({
      where: { id },
      data: {
        ...rest,
        level,
        prerequisites: connectManyPrerequisites(prerequisites),
      },
    });
    return programCourse;
  };

  static delete = async (id: string) => {
    const programCourse = await prisma.programCourse.delete({
      where: { id },
    });
    return programCourse;
  };
}
