import prisma from "../db";
import { Prisma } from "@prisma/client";

export class SheetInstance {

    static create = async (data: any) => {
        const { sheetId, studentId, ...sheetInstanceData } = data;
        const sheetInstance = await prisma.sheetInstance.create({
            data: {
                ...sheetInstanceData,
                sheet: {
                    connect: { id: sheetId },
                },
                student: {
                    connect: { id: studentId },
                },
            }
        });
        return sheetInstance;
    }

    static createMany = async (data: any) => {
        const { sheetId, studentId, ...sheetInstanceData } = data;
        const Instances: Prisma.SheetInstanceCreateManyInput[] = [];
        for (const ids of studentId) {
            const Instance: Prisma.SheetInstanceCreateManyInput = {
                sheetId: sheetId,
                studentId: ids,
                ...sheetInstanceData
              };
              Instances.push(Instance);
        }
          const sheetInstances = await prisma.sheetInstance.createMany({
            data: Instances,
          });
        
        return sheetInstances;
    }

    static get = async (id: string) => {
        const data = await prisma.sheetInstance.findUnique({
            where: { id },
            include: {
                sheet: true,
            }
        });
        return data;
    }

    static getStudentAll = async (studentId: string) => {
        const data = await prisma.sheetInstance.findMany({
            where: { studentId },
        });
        return data;
    }

    static getAll = async (sheetId: string) => {
        const data = await prisma.sheetInstance.findMany({
            where: { sheetId },
        });
        return data;
    }

    static update = async (id: string, data: Prisma.SheetInstanceUncheckedUpdateInput) => {
        const { answers, ...rest } = data;
        const instance = await prisma.sheetInstance.update({
            where: { id },
            data: {
                ...rest,
                answers,
            },
        });
        return instance;
    }

    static delete = async (id: string) => {
        const instance = await prisma.sheetInstance.delete({
            where: { id },
        });
        return instance;
    }
}