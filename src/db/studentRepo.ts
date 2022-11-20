import { Repo } from "./repo";
import prisma from ".";
import { Prisma } from "@prisma/client";

export class StudentRepo extends Repo<
  { user: Prisma.UserCreateInput; formId: string },
  Prisma.StudentUpdateInput,
  Prisma.StudentWhereUniqueInput,
  Prisma.StudentWhereInput
> {
  constructor() {
    super(prisma.student);
  }

  create = async (data: { user: Prisma.UserCreateInput; formId: string }) => {
    return await this.model.create({
      data: {
        user: {
          create: data.user,
        },
        studentInfo: {
          connect: {
            id: data.formId,
          },
        },
      },
    });
  };

  update = async (
    query: Prisma.StudentWhereUniqueInput,
    data: Prisma.StudentUpdateInput
  ) => {
    throw new Error("Not implemented");
  };
}
