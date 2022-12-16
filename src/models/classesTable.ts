import prisma from "../db";

const createManyClasses = (classes: any) => {
  return {
    create: classes?.map((classData: any) => {
      const { professorId, courseInstanceId, ...rest } = classData;
      return {
        ...rest,
        professor: professorId ? { connect: { id: professorId } } : undefined,
        courseInstance: courseInstanceId
          ? { connect: { id: courseInstanceId } }
          : undefined,
      };
    }),
  };
};

const addCourseNamesToClasses = async (classes: any) => {
  return await Promise.all(
    classes.map(async (classData: any) => {
      const { courseInstanceId, ...rest } = classData;
      const courseInstance = await prisma.courseInstance.findUnique({
        where: { id: courseInstanceId },
        select: {
          englishName: true,
          arabicName: true,
        },
      });
      return {
        courseInstanceId,
        ...courseInstance,
        ...classData,
      };
    })
  );
};

const classesSelect = {
  select: {
    englishName: true,
    arabicName: true,
    startDate: true,
    startPeriod: true,
    endPeriod: true,
    endDate: true,
    classType: true,
    day: true,
  },
};

export class ClassesTable {
  static get = async (id: string) => {
    const data = await prisma.classesTable.findUnique({
      where: { id },
      include: {
        classes: classesSelect,
      },
    });
    return data;
  };

  static getAll = async (programId: string, semesterId: string) => {
    const data = await prisma.classesTable.findMany({
      where: {
        programId,
        semesterId,
      },
      select: {
        level: {
          select: {
            id: true,
            englishName: true,
            arabicName: true,
          },
        },
      },
    });
    return data;
  };

  static create = async (data: any) => {
    const { levelId, programId, classes, academicSemesterId, ...rest } = data;

    // add englishName and arabicName from courseInstance to each class
    const classesWithNames = await addCourseNamesToClasses(classes);

    const level = levelId ? { connect: { id: levelId } } : undefined;
    const program = programId ? { connect: { id: programId } } : undefined;
    const academicSemester = academicSemesterId
      ? { connect: { id: academicSemesterId } }
      : undefined;

    const classesTable = await prisma.classesTable.create({
      data: {
        ...rest,
        level,
        program,
        academicSemester,
        classes: createManyClasses(classesWithNames),
      },
    });
    return classesTable;
  };

  static update = async (id: string, data: any) => {
    const { classes, ...rest } = data;
    const classesWithNames = await addCourseNamesToClasses(classes);
    const classesTable = await prisma.classesTable.update({
      where: { id },
      data: {
        ...rest,
        // delete all classes and create new ones
        classes: {
          deleteMany: {
            tableId: id,
          },
          ...createManyClasses(classesWithNames),
        },
      },
      include: {
        classes: classesSelect,
      },
    });
    return classesTable;
  };
}
