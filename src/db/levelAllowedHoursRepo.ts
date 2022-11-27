import { Repo } from "./repo";
import prisma from ".";
import { Prisma } from "@prisma/client";

export class LevelAllowedHoursRepo extends Repo<
  Prisma.LevelAllowedHoursCreateInput,
  Prisma.LevelAllowedHoursUpdateInput,
  Prisma.LevelAllowedHoursWhereUniqueInput,
  Prisma.LevelAllowedHoursWhereInput
> {
  constructor() {
    super(prisma.levelAllowedHours);
  }
}
