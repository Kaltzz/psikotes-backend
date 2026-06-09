import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsername(username: string) {
  return await prisma.admin.findUnique({
    where: {
      username: username,
    },
  });
}

export const findRefreshToken = async (token: string) => {
  return prisma.refreshToken.findUnique({ where: { token } });
};

export const updateRefreshToken = async (
  oldToken: string,
  newToken: string,
) => {
  return prisma.refreshToken.update({
    where: { token: oldToken },
    data: {
      token: newToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
};

export const deleteRefreshToken = async (token: string) => {
  return prisma.refreshToken.delete({ where: { token } });
};

export const deleteRefreshTokenByToken = async (token: string) => {
  return prisma.refreshToken.deleteMany({ where: { token } });
};
