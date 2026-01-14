import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsername(username: string) {
    return await prisma.admin.findUnique({
        where: {
            username: username
        }
    })
}
