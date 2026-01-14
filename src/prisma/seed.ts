import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

async function main() {

    const plainPassword = '123456';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await prisma.admin.create({
        data: {
            username: 'admin3',
            password: hashedPassword
        }
    });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());