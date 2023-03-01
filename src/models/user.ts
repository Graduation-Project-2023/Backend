import { Prisma } from "@prisma/client";
import prisma from "../db";

export class User {
  static getAll = async () => {
    const data = await prisma.user.findMany({});
    return data;
  };

  // get the user data using the email
  static get = async (email: string) => {
    const data = await prisma.user.findUnique({
      where: { email },
    });
    return data;
  };

  // to acquire the email and password of the user using the nationalId
  static get_nationalId = async (nationalId: string) => {
    const data = await prisma.user.findUnique({
      where: {nationalId},
    })
    return data
  }

  // to acquire the student data using the user id 
  static get_id = async (id: string) => {
    const data = await prisma.user.findUnique({
      where: {id},
      select: {
        id: true,
        email: true,
        role: true,
        student: {},
      },      
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

  static update = async (data: any) => {
    const { email, ...userData } = data;
    const user = await prisma.user.update({
      where: { email },
      data: {
        ...userData
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
