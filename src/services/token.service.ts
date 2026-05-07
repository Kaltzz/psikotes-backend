// import { nonactiveToken, tokenList, tokenPost } from "../models/token.model"
import { tokenNonactiveModel, fetchTokenModel, postTokenModel } from "../models/token.model"



export const getTokenService = async () => {
    try {
        const dataToken = await fetchTokenModel()
        return ({
            status: true,
            message: 'berhasil mendapatkan token',
            data: dataToken
        })
    } catch (error) {
        return ({
            status: false,
            message: 'gagal mendapatkan token'
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

export const addTokenService = async (postToken:any, res:any) => {
    // console.log('ini di Model: ', postToken)
    try{
        const newDataToken = {
            tests: postToken.tests,
            kuota: postToken.kuota,
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