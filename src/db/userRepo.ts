import { Repo } from "./repo";
import prisma from ".";
import { Prisma } from "@prisma/client";

export class UserRepo extends Repo<
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput,
  Prisma.UserWhereUniqueInput,
  Prisma.UserWhereInput
> {
  constructor() {
    super(prisma.user);
  }
}
