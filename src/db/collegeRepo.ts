import { Repo } from "./repo";
import prisma from ".";
import { Prisma } from "@prisma/client";

export class CollegeRepo extends Repo<
  Prisma.CollegeCreateInput,
  Prisma.CollegeUpdateInput,
  Prisma.CollegeWhereUniqueInput,
  Prisma.CollegeWhereInput
> {
  constructor() {
    super(prisma.college);
  }
}
