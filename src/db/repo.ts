import { Prisma } from "@prisma/client";
// base repo class for crud operations in prisma
export abstract class Repo<
  CreateInput,
  UpdateInput,
  WhereUniqueInput,
  WhereInput
> {
  constructor(protected model: any) {}

  create = async (data: CreateInput) => {
    return await this.model.create({ data });
  };

  read = async (query: WhereUniqueInput, select: any = null) => {
    if (select) {
      return await this.model.findUnique({ where: query, select });
    }
    return await this.model.findUnique({
      where: query,
    });
  };

  readMany = async (query: WhereInput | null = null) => {
    if (!query) {
      return await this.model.findMany();
    }
    return await this.model.findMany({
      where: query,
    });
  };

  update = async (query: WhereUniqueInput, data: UpdateInput) => {
    return await this.model.update({
      where: query,
      data,
    });
  };

  delete = async (query: WhereUniqueInput) => {
    return await this.model.delete({ where: query });
  };

  deleteMany = async () => {
    return await this.model.deleteMany();
  };
}
