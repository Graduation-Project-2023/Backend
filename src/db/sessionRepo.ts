import { Repo } from "./repo";
import prisma from ".";
import { Prisma } from "@prisma/client";

export class SessionRepo extends Repo<
  Prisma.SessionCreateInput,
  Prisma.SessionUpdateInput,
  Prisma.SessionWhereUniqueInput,
  Prisma.SessionWhereInput
> {
  constructor() {
    super(prisma.session);
  }
}
