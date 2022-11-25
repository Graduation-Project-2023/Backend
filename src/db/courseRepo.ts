import { Repo } from "./repo";
import prisma from ".";
import { Prisma } from "@prisma/client";

export class CourseRepo extends Repo<
  Prisma.CourseCreateInput,
  Prisma.CourseUpdateInput,
  Prisma.CourseWhereUniqueInput,
  Prisma.CourseWhereInput
> {
  constructor() {
    super(prisma.course);
  }
}
