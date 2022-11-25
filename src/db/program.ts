import { Repo } from "./repo";
import prisma from ".";
import { Prisma } from "@prisma/client";

export class ProgramRepo extends Repo<
  Prisma.ProgramCreateInput,
  Prisma.ProgramUpdateInput,
  Prisma.ProgramWhereUniqueInput,
  Prisma.ProgramWhereInput
> {
  constructor() {
    super(prisma.program);
  }
}
