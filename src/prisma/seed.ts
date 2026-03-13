import { PrismaClient } from '@prisma/client';
import { cfitSeed } from './seeds/cfit'
import { adminSeed } from './seeds/admin';
import { discSeed } from './seeds/disc';

const prisma = new PrismaClient();

async function main() {
    // await adminSeed()
    // await cfitSeed()
    await discSeed()
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());