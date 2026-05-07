// import { PrismaClient } from '@prisma/client';
import { prisma } from '../utils/prisma'
// const prisma = new PrismaClient();

export async function getUsername(username: string) {
    return await prisma.admin.findUnique({
        where: {
            username: username
        }
    })
}
