import { PrismaClient, Role } from "@prisma/client";
// import { prisma } from '../utils/prisma'
import { generateTestToken } from "../utils/token.utils";

const prisma = new PrismaClient

//read token (semua)
export const fetchTokenModel = async (role:string) => {
    return await prisma.token.findMany({
        where: {
            role: role as Role
        },
        select: {
            id:true,
            token: true,
            tests: true,
            kuota: true,
            usedCount: true,
            isActive: true,
            activeDate: true,
            expiredDate: true
        }
    })
}

export const fetchTokenModelAdmin = async () => {
    return await prisma.token.findMany({
        select: {
            id:true,
            token: true,
            tests: true,
            kuota: true,
            usedCount: true,
            isActive: true,
            activeDate: true,
            expiredDate: true
        }
    })
}

//read token (spesifik (token) )
export const getSpecificToken = async (tokenInput:string) => {
        return await prisma.token.findUnique({
            where: {
                token: tokenInput
            },
            select: {
                token: true,
                tests: true,
                usedCount: true,
                kuota: true,
                id: true,
                isActive: true,
                activeDate: true,
                expiredDate: true
            }
        })
}

//tambah token
export const postTokenModel = async (newDataToken:any, res:any) => {
    return await prisma.token.create({
        data: {
            token: generateTestToken(5),
            tests: newDataToken.tests,
            role: newDataToken.role,
            kuota: newDataToken.kuota,
            activeDate: newDataToken.activeDate,
            expiredDate: newDataToken.expiredDate
        }
    })
}

export const    tokenNonactiveModel = async (id:number, res:any, statusActive:any) => {
        return await prisma.token.update({
            where: {
                id: id
            },
            data: {
                isActive: statusActive.status
            }
        })
}

export const addCount = async (id: any) => {
    const countUpdate = await prisma.token.update({
        where: {
            id: id,
        },
        data: {
            usedCount: {increment: 1}
        }
    })
}

