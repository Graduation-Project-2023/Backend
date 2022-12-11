import prisma from "../../db";

export class ProgramRelationModel {
  constructor(private model: any) {}

  get = async (id: string) => {
    const data = await this.model.findUnique({
      where: { id },
    });
    return data;
  };

  getAll = async (programId: string) => {
    const data = await this.model.findMany({
      where: {
        programId,
      },
    });
    return data;
  };

  create = async (data: any) => {
    const { programId, ...rest } = data;
    const program = {
      connect: {
        id: programId as string,
      },
    };
    const newData = await this.model.create({
      data: {
        ...rest,
        program,
      },
    });
    return newData;
  };

  update = async (id: string, data: any) => {
    const newData = await this.model.update({
      where: { id },
      data,
    });
    return newData;
  };

  delete = async (id: string) => {
    const newData = await this.model.delete({
      where: { id },
    });
    return newData;
  };
}

export class Level extends ProgramRelationModel {
  constructor() {
    super(prisma.level);
  }
}

export class Grade extends ProgramRelationModel {
  constructor() {
    super(prisma.grade);
  }
}

export class LevelAllowedHours extends ProgramRelationModel {
  constructor() {
    super(prisma.levelAllowedHours);
  }
}

export class GpaAllowedHours extends ProgramRelationModel {
  constructor() {
    super(prisma.gpaAllowedHours);
  }
}
