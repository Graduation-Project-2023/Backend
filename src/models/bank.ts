import prisma from "../db";
import { Prisma } from "@prisma/client";

export class Bank {
    /**
     * Class Bank
     * 
     * Responisble for creating the bank connected to the course
     * it depends on the course and is connected to the course code
    */

    static create = async (data: Prisma.BankUncheckedCreateInput) => {
        const bank = await prisma.bank.create({
            data
        });
        return bank;
    }

    static get = async (id: string) => {
        const data = await prisma.bank.findUnique({
            where: { id },
        });
        return data;
    }

    static getAll = async () => {
        const data = await prisma.bank.findMany();
        return data;
    }

    static update = async (id: string, data: Prisma.BankUncheckedUpdateInput) => {
        const bank = await prisma.bank.update({
            where: { id },
            data,
        });
        return bank;
    }

    static delete = async (id: string) => {
        const bank = await prisma.bank.delete({
            where: { id },
        });
        return bank;
    }
}