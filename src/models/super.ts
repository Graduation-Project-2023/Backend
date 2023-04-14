import { Prisma } from "@prisma/client";
import prisma from "../db";

export class Super {
  /**
   * Super class, responsible for creating and managing admins and connecting them to their colleges
   * super is the only one who can create admins, and admins can create the rest of the users (students, professors, etc)
   * 
   * get: 
   *  @params id: takes the id of the admin
   *  @returns specified admin data
   * 
   * getAll:
   *  @returns all admins in all colleges
   * 
   * getCollegeAdmins:
   *  @params collegeId: specific college id
   *  @returns all admins in a certain college
   * 
   * create:
   *  @params data: takes the data of the new admin, see the schema for the specific data
   *  @returns the newly created admin data
   * 
   * update:
   *  @params id: takes the id of the admin to be updated
   *  @params data: takes the data to be updated
   *  @returns the updated admin data
   * 
   * delete:
   *  @params id: takes the id of the admin to be deleted
   *  @returns the deleted admin data
   */

  // get certain admin
  static get = async (id: string) => {
    const data = await prisma.admin.findUnique({
        where: { id },
    });
    return data;
  };

  // get all admins
  static getAll = async () => {
    const data = await prisma.admin.findMany({});
    return data;
  };

  // get all admins in a certain college
  static getCollegeAdmins = async (collegeId: string) => {
    const data = await prisma.admin.findMany({
        where: { collegeId },
    });
    return data;
  };


  // create a new admin and connect it to a college
  static create = async (data: any) => {
    const { 
      email,
      password,
      nationalId,
      collegeId, 
      ...adminData 
    } = data;
    const admin = await prisma.admin.create({
      data: {
        college: {
          connect: { id: collegeId || undefined },
        },
        user: {
          create: {
            email,
            password,
            nationalId,
            role: "ADMIN",
          },
        },
        ...adminData,
      }
    });
    return admin;
  };

  // update an admin, you can promote or demote an admin
  static update = async (id: string, data: Prisma.AdminUpdateInput) => {
    const admin = await prisma.admin.update({
      where: { id },
      data: {
        ...data
      },
    });
    return admin;
  };

  // delete an admin
  static delete = async (id: string) => {
    const admin = await prisma.admin.delete({
      where: { id },
    });
    return admin;
  };
}
