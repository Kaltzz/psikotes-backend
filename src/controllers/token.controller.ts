// import { fetchToken, postToken, tokenNonactive } from "../services/token.service"
import { getTokenService, addTokenService, nonactiveTokenService } from "../services/token.service"


export const getToken = async (req:any, res:any) => {
    const role = req.user.role
    const tokenList = await getTokenService(role)

    if(!tokenList.status) {
        return res.status(400).json(tokenList)
    }

    return res.status(201).json(tokenList)
}

export const addToken = async (req:any, res:any) => {
    const role = req.user.role
    const token = await addTokenService(req.body, res, role)
    console.log('ini token update: ',req.body)
    if(!token.status) {
        return res.status(400).json(token)
    }

    return res.status(201).json(token)
}

export const spesificToken = async (req:any, res:any) => {
    const id = req.params.id // ???
    return console.log(id)
}

export const nonactiveToken = async (req:any, res:any) => {
    const id = Number(req.params.id)
    const statusActive = req.body
    console.log('ini controller:', statusActive)
    const token = await nonactiveTokenService(id, res, statusActive)
    
    if (!token.status) {
        return res.status(400).json(token)
    } 

    return res.status(201).json(token)
}