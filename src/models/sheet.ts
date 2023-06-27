import prisma from "../db";
import { Prisma } from "@prisma/client";

export class Sheet {

    static create = async (data: any) => {
        const { bankId, createdBy, ...sheetData } = data;
        const sheet = await prisma.sheet.create({
            data: {
                ...sheetData,
                bank: {
                    connect: { id: bankId },
                },
                user: {
                    connect: { id: createdBy },
                },
            }
        });
        return sheet;
    }

    static addQuestions = async (sheetId: string, questionId: string[]) => {
        const sheet = await prisma.sheet.update({
            where: { id: sheetId },
            data: {
                id: sheetId,
                questions: {
                    connect: questionId.map((id) => ({ id })),
                }
            }
        });
        return sheet;
    }

    static removeQuestions = async (sheetId: string, questionId: string[]) => {
        const sheet = await prisma.sheet.update({
            where: { id: sheetId },
            data: {
                id: sheetId,
                questions: {
                    disconnect: questionId.map((id) => ({ id })),
                }
            }
        });
        return sheet;
    }

    static get = async (id: string) => {
        const data = await prisma.sheet.findUnique({
            where: { id },
            include: {
                questions: true,
            }
        });
        return data;
    }

    static getAll = async (bankId: string) => {
        const data = await prisma.sheet.findMany({
            where: { bankId },
        });
        return data;
    }

    static update = async (id: string, data: Prisma.SheetUncheckedUpdateInput) => {
        const sheet = await prisma.sheet.update({
            where: { id },
            data,
        });
        return sheet;
    }

    static delete = async (id: string) => {
        const sheet = await prisma.sheet.delete({
            where: { id },
        });
        return sheet;
    }
}