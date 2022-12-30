import { ClassesTable } from "../models/classesTable";
import {
  Prisma,
  Class,
  ClassesTable as prismaClassesTable,
  GROUP,
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

const checkLabAndSectionCount = (
  classes: Class[],
  courseInstance: {
    id: string;
    sectionGroupCount: number | null;
    labGroupCount: number | null;
  }
) => {
  const foundClassesCount = classes.reduce(
    (acc, curr) => {
      if (curr.courseInstanceId === courseInstance.id) {
        if (curr.classType === "SECTION") {
          acc.sectionCount++;
        } else if (curr.classType === "LAB") {
          acc.labCount++;
        }
      }
      return acc;
    },
    { sectionCount: 0, labCount: 0 }
  );
  return (
    (foundClassesCount.sectionCount === courseInstance.sectionGroupCount ||
      foundClassesCount.sectionCount === 0) &&
    (foundClassesCount.labCount === courseInstance.labGroupCount ||
      foundClassesCount.labCount === 0)
  );
};

const checkLecturesCount = (
  classes: Class[],
  courseInstance: {
    id: string;
    lectureCount: number | null;
    hasLectureGroups: boolean | null;
    lectureGroupCount: number | null;
  }
) => {
  const lectures = classes.filter(
    (c) => c.courseInstanceId === courseInstance.id && c.classType === "LECTURE"
  );

  if (lectures.length === 0) return true;

  if (!courseInstance.hasLectureGroups) {
    return (
      lectures.length === courseInstance.lectureCount || lectures.length === 0
    );
  }

  // get the number of lectures for each group
  const groupCounts = lectures.reduce((acc, curr) => {
    if (curr.group) {
      acc[curr.group] = (acc[curr.group] || 0) + 1;
    }
    return acc;
  }, {} as { [key: string]: number });
  const groupCountValues = Object.values(groupCounts);
  const groupCount = groupCountValues[0];

  // validate that all groups have the same number of lectures
  const groupCountValuesSet = new Set(groupCountValues);
  if (groupCountValuesSet.size !== 1) {
    return false;
  }

  // validate that the number of lectures is equal to the number of lectures in the course instance,
  // and that the number of groups is equal to the number of groups in the course instance
  return (
    groupCountValues.length === courseInstance.lectureGroupCount &&
    groupCount === courseInstance.lectureCount
  );
};

// export const checkClassCount = (
//   classes: Class[],
//   courseInstances: {
//     id: string;
//     lectureCount: number | null;
//     lectureGroupCount: number | null;
//     hasLectureGroups: boolean;
//     labGroupCount: number | null;
//     sectionGroupCount: number | null;
//   }[]
// ) => {
//   for (const courseInstance of courseInstances) {
//     if (!checkLabAndSectionCount(classes, courseInstance)) {
//       return false;
//     }
//   }
//   return true;
// };

// export const validateClassesTable = (
//   classesTable: Class[],
//   courseInstances: {
//     id: string;
//     lectureCount: number | null;
//     labCount: number | null;
//   }[]
// ) => {
//   return (
//     checkOverlapping(classesTable) &&
//     checkClassCount(classesTable, courseInstances)
//   );
// };

export const validateTable = (
  courseInstances: {
    id: string;
    lectureCount: number | null;
    lectureGroupCount: number | null;
    hasLectureGroups: boolean | null;
    labGroupCount: number | null;
    sectionGroupCount: number | null;
  }[],
  classes: Class[]
) => {
  for (const courseInstance of courseInstances) {
    if (!checkLabAndSectionCount(classes, courseInstance)) {
      return {
        valid: false,
        type: "lab or section",
        courseInstanceId: courseInstance.id,
      };
    }
    if (!checkLecturesCount(classes, courseInstance)) {
      return {
        valid: false,
        type: "lecture",
        courseInstanceId: courseInstance.id,
      };
    }
  }
  return {
    valid: true,
    type: null,
    courseInstanceId: null,
  };
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
    const isValid = validateTable(courseInstances, classes);
    if (!isValid.valid) {
      throw new Error(
        `Invalid classes table: Invalid ${isValid.type} for ${isValid.courseInstanceId}`
      );
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
    const courseInstances = await getCourseInstances(
      classes,
      classesTable.programId
    );
    const isValid = validateTable(courseInstances, classes);
    if (!isValid.valid) {
      throw new Error(
        `Invalid classes table: Invalid ${isValid.type} for ${isValid.courseInstanceId}`
      );
    }
    return await ClassesTable.update(id, classesTable);
  };
}
