import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import dotenv from 'dotenv'

dotenv.config();

async function seed() {
    const admin = await prisma.user.upsert({
        create: {
            email: 'admin@suez.edu.eg',
            password: process.env.ADMIN_PASSWORD as string,
            role: 'ADMIN'
        },
        where: {
            email: 'admin@suez.edu.eg'
        },
        update: {}
    })
  console.log({ admin })
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