import { Repo } from "./repo";
import prisma from ".";
import { Prisma } from "@prisma/client";

export class GpaAllowedHoursRepo extends Repo<
  Prisma.GpaAllowedHoursCreateInput,
  Prisma.GpaAllowedHoursUpdateInput,
  Prisma.GpaAllowedHoursWhereUniqueInput,
  Prisma.GpaAllowedHoursWhereInput
> {
  constructor() {
    super(prisma.gpaAllowedHours);
  }
}
