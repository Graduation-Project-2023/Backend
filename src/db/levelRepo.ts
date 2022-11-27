import { Repo } from "./repo";
import prisma from ".";
import { Prisma } from "@prisma/client";

export class LevelRepo extends Repo<
  Prisma.LevelCreateInput,
  Prisma.LevelUpdateInput,
  Prisma.LevelWhereUniqueInput,
  Prisma.LevelWhereInput
> {
  constructor() {
    super(prisma.level);
  }
}
