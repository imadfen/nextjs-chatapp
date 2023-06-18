import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function resetDB() {
    try {
        await prisma.userRoom.deleteMany()
        await prisma.message.deleteMany()
        await prisma.room.deleteMany()
        await prisma.user.deleteMany()
    } catch (error) {
        console.error(error)
    }
}

export default prisma