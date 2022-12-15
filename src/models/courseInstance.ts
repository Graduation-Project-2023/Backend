import prisma from "../db";
import { ProgramCourse } from "./programs/programCourse";

export class CourseInstance {
  static get = async (id: string) => {
    const data = await prisma.courseInstance.findUnique({
      where: { id },
    });
    return data;
  };

  static getAll = async (levelId: string) => {
    const data = await prisma.courseInstance.findMany({
      where: {
        levelId,
      },
      select: {
        id: true,
        englishName: true,
        arabicName: true,
      },
    });
    return data;
  };

  static create = async (data: any) => {
    const { semesterId, programCourseId, levelId, professorId, ...rest } = data;
    const academicSemester = semesterId
      ? { connect: { id: semesterId } }
      : undefined;
    const programCourse = programCourseId
      ? { connect: { id: programCourseId } }
      : undefined;
    const professor = professorId
      ? { connect: { id: professorId } }
      : undefined;
    // get normalized data from program course
    const programCourseData = await ProgramCourse.get(programCourseId);
    if (!programCourseData) throw new Error("Program Course is required");
    rest.englishName = rest.englishName
      ? rest.englishName
      : programCourseData.englishName;
    rest.arabicName = rest.arabicName
      ? rest.arabicName
      : programCourseData.arabicName;
    const level = levelId ? { connect: { id: levelId } } : undefined;

    const courseInstance = await prisma.courseInstance.create({
      data: {
        ...rest,
        academicSemester,
        programCourse,
        level,
        professor,
      },
    });
    return courseInstance;
  };

  static update = async (id: string, data: any) => {
    const { professorId, ...rest } = data;
    const professor = professorId
      ? { connect: { id: professorId } }
      : undefined;
    const courseInstance = await prisma.courseInstance.update({
      where: { id },
      data: {
        ...rest,
        professor,
      },
    });
    return courseInstance;
  };
}
