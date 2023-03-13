import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import dotenv from 'dotenv'

dotenv.config();

async function seed() {
    const sysadmin = await prisma.user.upsert({
        create: {
            email: 'super@suez.edu.eg',
            password: process.env.SUPER_PASSWORD as string,
            role: 'SUPER'
        },
        where: {
            email: 'super@suez.edu.eg'
        },
        update: {}
    })
  console.log({ sysadmin })
}
seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })