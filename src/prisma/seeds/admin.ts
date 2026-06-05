import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const adminSeed = async () => {
  // seed untuk buat admin
  const plainPassword = "aptana123";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await prisma.admin.create({
    data: {
      username: "aptana",
      password: hashedPassword,
      role: Role.ACS,
    },
  });
};

export { adminSeed };
