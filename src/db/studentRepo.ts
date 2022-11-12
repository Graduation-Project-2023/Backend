import { Repo } from "./repo";
import prisma from ".";
import { Prisma } from "@prisma/client";

export class StudentRepo extends Repo<
  Prisma.StudentCreateInput,
  Prisma.StudentUpdateInput,
  Prisma.StudentWhereUniqueInput,
  Prisma.StudentWhereInput
> {
  constructor() {
    super(prisma.student);
  }
}
