import { Repo } from "./repo";
import prisma from ".";
import { Prisma } from "@prisma/client";

export class FormRepo extends Repo<
  Prisma.formCreateInput,
  Prisma.formUpdateInput,
  Prisma.formWhereUniqueInput,
  Prisma.formWhereInput
> {
  constructor() {
    super(prisma.form);
  }
}
