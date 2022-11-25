import { Repo } from "./repo";
import prisma from ".";
import { Prisma } from "@prisma/client";

export class ProgramCourseRepo extends Repo<
  Prisma.ProgramCourseCreateInput,
  Prisma.ProgramCourseUpdateInput,
  Prisma.ProgramCourseWhereUniqueInput,
  Prisma.ProgramCourseWhereInput
> {
  constructor() {
    super(prisma.programCourse);
  }
}
