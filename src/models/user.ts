import { Prisma } from "@prisma/client";
import prisma from "../db";

export class User {
  static getAll = async () => {
    const data = await prisma.user.findMany({});
    return data;
  };

  static get = async (email: string) => {
    const data = await prisma.user.findUnique({
      where: { email },
    });
    return data;
  };

  static create = async (data: any) => {
    const user = await prisma.user.create({
      data: {
        ...data,
      },
    });
    return user;
  };

  static createMany = async (data: Prisma.UserCreateManyInput[]) => {
    const users = await prisma.user.createMany({
      data,
    });
    return users;
  };

  static update = async (email: string, password: string) => {
    const user = await prisma.user.update({
      where: { email },
      data: {
        password,
      },
    });
    return user;
  };

  static delete = async (id: string) => {
    const user = await prisma.user.delete({
      where: { id },
    });
    return user;
  };
}
