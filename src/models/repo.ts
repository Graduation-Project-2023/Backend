// base repo class for crud operations in prisma
export class Repo {
  constructor(private model: any) {}

  create = async (data: any) => {
    return await this.model.create({ data });
  };

  readMany = async (query: any) => {
    if (!query) {
      return await this.model.findMany();
    }
    return await this.model.findMany(query);
  };

  update = async (id: string, data: any) => {
    return await this.model.update({
      where: { id },
      data,
    });
  };

  delete = async (id: string) => {
    return await this.model.delete({ where: { id } });
  };

  read = async (query: any) => {
    return await this.model.findUnique(query);
  };
}
