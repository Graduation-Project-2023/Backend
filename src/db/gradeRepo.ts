import { Repo } from "./repo";
import prisma from ".";
import { Prisma } from "@prisma/client";

export class GradeRepo extends Repo<
  Prisma.GradeCreateInput,
  Prisma.GradeUpdateInput,
  Prisma.GradeWhereUniqueInput,
  Prisma.GradeWhereInput
> {
  constructor() {
    super(prisma.grade);
  }
}
