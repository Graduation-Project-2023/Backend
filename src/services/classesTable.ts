import { ClassesTable } from "../models/classesTable";
import {
  Prisma,
  Class,
  ClassesTable as prismaClassesTable,
} from "@prisma/client";

export const validateClassesTable = (classes: Class[]) => {
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
    if (currentClass.day === nextClass.day) {
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

const createClassesTable = async (
  classesTable: Prisma.Without<prismaClassesTable, "id"> & { classes: Class[] }
) => {
  const classes = classesTable.classes;
  if (!validateClassesTable(classes)) {
    throw new Error("Invalid classes table");
  }
  return await ClassesTable.create(classesTable);
};

const getClassesTable = async (id: string) => {
  return await ClassesTable.get(id);
};

const getAllClassesTables = async (filter: Prisma.ClassesTableWhereInput) => {
  return await ClassesTable.getAll(filter);
};

const updateClassesTable = async (
  id: string,
  classesTable: Prisma.Without<prismaClassesTable, "id"> & { classes: Class[] }
) => {
  const classes = classesTable.classes;
  if (!validateClassesTable(classes)) {
    throw new Error("Invalid classes table");
  }
  return await ClassesTable.update(id, classesTable);
};

export class ClassesTableService {
  static get = getClassesTable;
  static getAll = getAllClassesTables;
  static create = createClassesTable;
  static update = updateClassesTable;
}
