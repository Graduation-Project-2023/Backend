// import prisma from "../db";

// export default class SheetInstance {
//     async create(data: any) {
//         const sheetInstance = await prisma.sheetInstance.create({
//         data,
//         });
//         return sheetInstance;
//     }
    
//     async update(data: any) {
//         const sheetInstance = await prisma.sheetInstance.update({
//         data,
//         where: { id: data.id },
//         });
//         return sheetInstance;
//     }
    
//     async delete(id: string) {
//         const sheetInstance = await prisma.sheetInstance.delete({
//         where: { id },
//         });
//         return sheetInstance;
//     }
// }