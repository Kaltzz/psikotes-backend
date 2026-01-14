import { PrismaClient } from "@prisma/client";
import { generateTestToken } from "../utils/token.utils";


const prisma = new PrismaClient


//tampillkan token
export const tokenList = async () => {
    const listToken = await prisma.token.findMany()
    return listToken
}

//tambah token
export const tokenPost = async (postToken:any, res:any) => {
    const newToken = await prisma.token.create({
        data: {
            token: generateTestToken(5),
            tests: postToken.tests,
            kuota: postToken.kuota
        }
    })

    return res.status(200).json({
        message: 'data berhasil ditambahkan'
    })
}

export const deleteToken = async (id:number, res:any) => {
    try {
        const tokenDelete = await prisma.token.delete({
            where: {
                id: id
            }
        })

        return ({
            success: true,
            message: 'Berhasil dihapus.',
            data: tokenDelete
        })
    } catch(error) {
        console.log(error)
        return ({
            success: false,
            message: 'Gagal menghapus token.'
        })
    }
}