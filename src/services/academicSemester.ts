import { SEMESTER } from "@prisma/client";
import prisma from "../db";

export const newAcademicSemester = async (
  academicYear: string,
  semester: SEMESTER
) => {
  const academicSemester = await prisma.academicSemester.create({
    data: {
      academicYear,
      semester,
    },
  });
  return academicSemester;
};
