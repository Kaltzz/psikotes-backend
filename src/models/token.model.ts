import { PrismaClient, Role, Unit } from "@prisma/client";
import { generateTestToken } from "../utils/token.utils";

const prisma = new PrismaClient();

//read token (semua)
export const fetchTokenModel = async (
  role: string,
  page: number,
  limit: number,
  offset: number,
  newStatus?: boolean,
  startDate?: string,
  endDate?: string,
) => {
  return await prisma.token.findMany({
    take: limit,
    skip: offset,
    where: {
      role: role as Role,
      ...(newStatus !== undefined && { isActive: newStatus }),
      ...(startDate || endDate
        ? {
            createdAt: {
              ...(startDate ? { gte: new Date(startDate) } : {}),
              ...(endDate ? { lte: new Date(endDate) } : {}),
            },
          }
        : {}),
    },
    orderBy: [{ isActive: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      token: true,
      tests: true,
      kuota: true,
      usedCount: true,
      isActive: true,
      activeDate: true,
      expiredDate: true,
    },
  });
};

export const allDataTokenModel = async (
  role: string,
  newStatus?: boolean,
  startDate?: string,
  endDate?: string,
) => {
  return await prisma.token.count({
    where: {
      role: role as Role,
      ...(newStatus !== undefined && { isActive: newStatus }),
      ...(startDate || endDate
        ? {
            createdAt: {
              ...(startDate ? { gte: new Date(startDate) } : {}),
              ...(endDate ? { lte: new Date(endDate) } : {}),
            },
          }
        : {}),
    },
  });
};

export const allDataTokenAdminModel = async (
  newStatus?: boolean,
  startDate?: string,
  endDate?: string,
) => {
  return await prisma.token.count({
    where: {
      ...(newStatus !== undefined && { isActive: newStatus }),
      ...(startDate || endDate
        ? {
            createdAt: {
              ...(startDate ? { gte: new Date(startDate) } : {}),
              ...(endDate ? { lte: new Date(endDate) } : {}),
            },
          }
        : {}),
    },
  });
};

export const fetchTokenModelAdmin = async (
  page: number,
  limit: number,
  offset: number,
  newStatus?: boolean,
  startDate?: string,
  endDate?: string,
) => {
  return await prisma.token.findMany({
    take: limit,
    skip: offset,
    where: {
      ...(newStatus !== undefined && { isActive: newStatus }),
      ...(startDate || endDate
        ? {
            createdAt: {
              ...(startDate ? { gte: new Date(startDate) } : {}),
              ...(endDate ? { lte: new Date(endDate) } : {}),
            },
          }
        : {}),
    },
    select: {
      id: true,
      token: true,
      tests: true,
      kuota: true,
      usedCount: true,
      isActive: true,
      activeDate: true,
      expiredDate: true,
    },
    orderBy: [
      { isActive: "desc" },
      { expiredDate: "desc" },
      { createdAt: "desc" },
    ],
  });
};

//read token (spesifik (token) )
export const getSpecificToken = async (tokenInput: string) => {
  return await prisma.token.findUnique({
    where: {
      token: tokenInput,
    },
    select: {
      token: true,
      tests: true,
      usedCount: true,
      kuota: true,
      id: true,
      isActive: true,
      activeDate: true,
      expiredDate: true,
    },
  });
};

//tambah token
export const postTokenModel = async (newDataToken: any, res: any) => {
  return await prisma.token.create({
    data: {
      token: generateTestToken(5),
      tests: newDataToken.tests,
      role: newDataToken.role,
      kuota: newDataToken.kuota,
      activeDate: newDataToken.activeDate,
      expiredDate: newDataToken.expiredDate,
    },
  });
};

export const tokenNonactiveModel = async (
  id: number,
  res: any,
  statusActive: any,
) => {
  return await prisma.token.update({
    where: {
      id: id,
    },
    data: {
      isActive: statusActive.status,
    },
  });
};

export const addCount = async (id: any) => {
  const countUpdate = await prisma.token.update({
    where: {
      id: id,
    },
    data: {
      usedCount: { increment: 1 },
    },
  });
};

export const updateTokenModel = async (id: number) => {
  const updateToken = await prisma.token.update({
    where: {
      id: id,
    },
    data: {
      isActive: false,
    },
  });
};

export const getAllTokenStatusAdminModel = async (
  startDate?: string,
  endDate?: string,
) => {
  return await prisma.token.groupBy({
    by: ["isActive"],
    _count: {
      isActive: true,
    },
    where: {
      ...(startDate || endDate
        ? {
            createdAt: {
              ...(startDate ? { gte: new Date(startDate) } : {}),
              ...(endDate ? { lte: new Date(endDate) } : {}),
            },
          }
        : {}),
    },
  });
};

export const getAllTokenStatusModel = async (
  role: string,
  startDate?: string,
  endDate?: string,
) => {
  return await prisma.token.groupBy({
    by: ["isActive"],
    _count: {
      isActive: true,
    },
    where: {
      role: role as Role,
      ...(startDate || endDate
        ? {
            createdAt: {
              ...(startDate ? { gte: new Date(startDate) } : {}),
              ...(endDate ? { lte: new Date(endDate) } : {}),
            },
          }
        : {}),
    },
  });
};

export const refreshTokenModel = async () => {
  const token = await prisma.token.updateMany({
    where: {
      expiredDate: {
        lt: new Date(),
      },
      isActive: true,
    },
    data: {
      isActive: false,
    },
  });
};
