import { ClassesTable } from "../models/classesTable";
import {
  Prisma,
  Class,
  ClassesTable as prismaClassesTable,
} from "@prisma/client";
import { CourseInstance } from "../models/courseInstance";

const getCourseInstances = async (classes: Class[], programId: any) => {
  const courseInstanceIds = Array.from(
    new Set(classes.map((c) => c.courseInstanceId))
  );
  const courseInstances = await CourseInstance.getAll({
    AND: [
      {
        programId: programId,
      },
      {
        id: {
          in: courseInstanceIds,
        },
      },
    ],
  });
  return courseInstances;
};

export const checkOverlapping = (classes: Class[]) => {
  const sortedClasses = classes.sort((a, b) => {
    if (a.day < b.day) return -1;
    if (a.day > b.day) return 1;
    if (a.startPeriod < b.startPeriod) return -1;
    if (a.startPeriod > b.startPeriod) return 1;
    return 0;
  });
  for (let i = 0; i < sortedClasses.length - 1; i++) {
    const currentClass = sortedClasses[i];
    const nextClass = sortedClasses[i + 1];
    if (
      currentClass.day === nextClass.day &&
      currentClass.classType === "LECTURE"
    ) {
      if (
        currentClass.endPeriod >= nextClass.startPeriod ||
        currentClass.startPeriod >= nextClass.endPeriod
      ) {
        return false;
      }
    }
  }
  return true;
};

const checkSingleCourseCount = (
  classes: Class[],
  courseInstance: {
    id: string;
    lectureCount: number | null;
    labCount: number | null;
  }
) => {
  const foundClassesCount = classes.reduce(
    (acc, curr) => {
      if (curr.courseInstanceId === courseInstance.id) {
        if (curr.classType === "LECTURE") {
          acc.lectureCount++;
        } else if (curr.classType === "LAB" || curr.classType === "SECTION") {
          acc.labCount++;
        }
      }
      return acc;
    },
    { lectureCount: 0, labCount: 0 }
  );
  return (
    foundClassesCount.lectureCount === courseInstance.lectureCount &&
    foundClassesCount.labCount === courseInstance.labCount
  );
};

export const checkClassCount = (
  classes: Class[],
  courseInstances: {
    id: string;
    lectureCount: number | null;
    labCount: number | null;
  }[]
) => {
  for (const courseInstance of courseInstances) {
    if (!checkSingleCourseCount(classes, courseInstance)) {
      return false;
    }
  }
  return true;
};

export const validateClassesTable = (
  classesTable: Class[],
  courseInstances: {
    id: string;
    lectureCount: number | null;
    labCount: number | null;
  }[]
) => {
  return (
    checkOverlapping(classesTable) &&
    checkClassCount(classesTable, courseInstances)
  );
};

export class ClassesTableService {
  static create = async (
    classesTable: Prisma.Without<prismaClassesTable, "id"> & {
      classes: Class[];
    }
  ) => {
    const classes = classesTable.classes;
    const courseInstances = await getCourseInstances(
      classes,
      classesTable.programId
    );
    if (!validateClassesTable(classes, courseInstances)) {
      throw new Error("Invalid classes table");
    }
    return await ClassesTable.create(classesTable);
  };

  static get = async (filter: Prisma.ClassesTableWhereUniqueInput) => {
    return await ClassesTable.get(filter);
  };

  static getAll = async (filter: Prisma.ClassesTableWhereInput) => {
    return await ClassesTable.getAll(filter);
  };

  static update = async (
    id: string,
    classesTable: Prisma.Without<prismaClassesTable, "id"> & {
      classes: Class[];
    }
  ) => {
    const classes = classesTable.classes;
    if (!checkOverlapping(classes)) {
      throw new Error("Invalid classes table");
    }
    return await ClassesTable.update(id, classesTable);
  };
}
