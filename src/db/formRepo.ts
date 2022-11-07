import { Repo } from "./repo";
import prisma from ".";
import { Prisma } from "@prisma/client";

export class FormRepo extends Repo<
  Prisma.FormCreateInput,
  Prisma.FormUpdateInput,
  Prisma.FormWhereUniqueInput,
  Prisma.FormWhereInput
> {
  constructor() {
    super(prisma.form);
  }
}
