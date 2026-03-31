import { PrismaClient } from '@prisma/client';
import { cfitSeed } from './seeds/cfit'
import { adminSeed } from './seeds/admin';
import { discSeed } from './seeds/disc';
import { papikostickSeed } from './seeds/papikostick';
import { msdtSeed } from './seeds/msdt';
import { mbtiSeed } from './seeds/mbti';

const prisma = new PrismaClient();

async function main() {
    // await adminSeed()
    // await cfitSeed()
    // await discSeed()
    // await papikostickSeed()
    // await msdtSeed()
    await mbtiSeed()

}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());