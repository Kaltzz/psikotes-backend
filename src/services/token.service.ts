import { deleteToken, tokenList, tokenPost } from "../models/token.model"

export const fetchToken = async () => {
    const dataToken = await tokenList()
    if (!dataToken) {
        return ({
            success: false,
            message: 'Data tidak ditemukan.'
        })
    }
    return ({
        success: true,
        message: 'Data ditemukan',
        data: dataToken
    })
}

export const postToken = async (postToken:any, res:any) => {
    // console.log('ini di service: ', postToken)
    const dataToken = await tokenPost(postToken, res)
}

export const tokenDelete = async (id:any, res:any) => {
    const deleteMessage = await deleteToken(id, res)

    return deleteMessage
}