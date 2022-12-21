import { Prisma } from "@prisma/client";
import prisma from "../db";

export class User {
  static getAll = async () => {
    const data = await prisma.user.findMany({});
    return data;
  };

  static get = async (id: string) => {
    const data = await prisma.user.findUnique({
      where: { id },
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

  static update = async (id: string, data: Prisma.UserCreateInput) => {
    const user = await prisma.user.update({
      where: { id },
      data,
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
