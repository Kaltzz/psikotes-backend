// import { nonactiveToken, tokenList, tokenPost } from "../models/token.model"
import { Role } from "@prisma/client"
import { tokenNonactiveModel, fetchTokenModel, postTokenModel, fetchTokenModelAdmin, allDataTokenAdminModel, allDataTokenModel } from "../models/token.model"



export const getTokenService = async (
    role:string,
    page: number, 
    limit: number, 
    offset:any, 
    startDate?:string,
    endDate?:string
) => {
    try {
        let dataToken, allData
        if(role === Role.ADMIN) {
            dataToken = await fetchTokenModelAdmin(page, limit, offset, startDate, endDate)
            allData = await allDataTokenAdminModel(startDate, endDate)
        } else {
            dataToken = await fetchTokenModel(role, page, limit, offset, startDate, endDate)
            allData = await allDataTokenModel(role, startDate, endDate)
        }
        let totalPages = Math.ceil(allData / limit)    

        if (!dataToken) {
        return {
            status: false,
            message: "gagal mendapatkan data"
        }
    }

    if (dataToken.length === 0) {
        return {
            status: true,
            message: "Data kosong"
        }
    }

        return ({
            status: true,
            message: 'berhasil mendapatkan token',
            data: dataToken,
            pagination: {
                allData: allData,
                totalPages: totalPages
            }
        })
    } catch (error:any) {
        return ({
            status: false,
            message: error.message
        })
    }
    // if (!dataToken) {
    //     return ({
    //         success: false,
    //         message: 'Data tidak ditemukan.'
    //     })
    // }
    // return ({
    //     success: true,
    //     message: 'Data ditemukan',
    //     data: dataToken
    // })
}

export const addTokenService = async (postToken:any, res:any, role:string) => {
    // console.log('ini di Model: ', postToken)
    try{
        const newDataToken = {
            tests: postToken.tests,
            kuota: postToken.kuota,
            role: role,
            activeDate: new Date(postToken.activeDate),
            expiredDate: new Date(postToken.expiredDate)
        }
        const dataToken = await postTokenModel(newDataToken, res)
        return ({
            status: true,
            message: 'berhasil menambahkan token',
            data: dataToken
        })
    } catch(error) {
        return({
            status: false,
            message: 'gagal menambahkan token',
        })
    }
}

export const nonactiveTokenService = async (id:any, res:any, statusActive:boolean) => {
    console.log('ini service:', statusActive)
    
    try{
        const deleteMessage = await tokenNonactiveModel(id, res, statusActive)
        return({
            status: true,
            message: 'token berhasi dinonaktifkan',
            data: deleteMessage
        })
    } catch(error) {
        return ({
            status: false,
            message: 'token gagal dinonaktifkan'
        })
    }
}