import prisma from "../db";
import { Prisma } from "@prisma/client";

export class Question {

    static create = async (data: any) => {
        const { bankId, addedBy, ...rest } = data;
        const question = await prisma.question.create({
            data: {
                ...rest,
                bank: {
                    connect: { id: bankId },
                },
                user: {
                    connect: { id: addedBy },
                },
            },

        });
        return question;
    }

    static get = async (id: string) => {
        const data = await prisma.question.findUnique({
            where: { id },
        });
        return data;
    }

    static getAll = async (bankId: string) => {
        const data = await prisma.question.findMany({
            where: { bankId },
        });
        return data;
    }

    static update = async (id: string, data: Prisma.BankUncheckedUpdateInput) => {
        const question = await prisma.question.update({
            where: { id },
            data,
        });
        return question;
    }

    static delete = async (id: string) => {
        const question = await prisma.question.delete({
            where: { id },
        });
        return question;
    }
}