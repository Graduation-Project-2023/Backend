import { Repo } from "./repo";
import prisma from ".";
import { Prisma } from "@prisma/client";

export class StudentRepo extends Repo<
  Prisma.StudentUncheckedCreateInput,
  Prisma.StudentUncheckedUpdateInput,
  Prisma.StudentWhereUniqueInput,
  Prisma.StudentWhereInput
> {
  constructor() {
    super(prisma.student);
  }

  create = async (data: Prisma.StudentUncheckedCreateInput) => {
    const { userId, ...rest } = data;
    return await this.model.create({
      data: {
        ...rest,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  };

  update = async (
    query: Prisma.StudentWhereUniqueInput,
    data: Prisma.StudentUncheckedUpdateInput
  ) => {
    return await this.model.update({
      where: query,
      data,
    });
  };
}
