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

  create = async (data: Prisma.ProgramCreateInput) => {
    if (data.system === "CREDIT") {
      // throw error if credit hours are not provided
      if (!data.creditHours || !data.allowedHrs) {
        throw new Error("Credit hours are required for credit system");
      }
    }
    return await this.model.create({ data });
  };
}
