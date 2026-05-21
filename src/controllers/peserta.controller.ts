import { start } from "node:repl"
import { postPesertaService, 
        getAllPesertaService, 
        getDetailPesertaService,
        statusPesertaService,
        hasilPesertaService,
        hasilTesService,
        userExpiredService,
        getAllPosisiService,
        getAllHasilPosisiService,
        // getFilteredDateService
        // setTrueService
    } from "../services/peserta.service"


export const postPeserta = async (req:any, res:any) => {
    const peserta = await postPesertaService(req.body, res)

    if (!peserta.status) {
        return res.status(400).json(peserta)
    }

    return res.status(201).json(peserta)
}

export const getAllPeserta = async (req: any, res:any) => {
    const role = req.user.role
    
    //add pagination
    let posisi = req.query.posisi
    if (posisi === "Semua") {
        posisi = null
    }
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    const nama = req.query.nama 
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit
    console.log('ini startDate',startDate)
    console.log('ini endDate',endDate)
    const peserta = await getAllPesertaService(role, page, limit, offset, posisi, nama, startDate, endDate)

    if (!peserta.status) {
        return res.status(400).json(peserta)
    }
    return res.status(201).json(peserta)
}

export const getDetailPeserta = async (req: any, res:any) => {
    const id = Number(req.params.id)
    const peserta = await getDetailPesertaService(id, res)

    // return res.status(peserta.status).json({
    //     message: peserta.message,
    //     data: peserta.data
    // })

    if (!peserta.status) {
        return res.status(400).json(peserta)
    }

    return res.status(201).json(peserta)
}

export const getAllPosisi = async (req:any, res:any) => {
    // const posisi = req.query.posisi
    const nama = req.query.nama
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    const allPosisi = await getAllPosisiService(nama, startDate, endDate)
    

    if(!allPosisi.status) {
        return res.status(400).json(allPosisi)
    }

    return res.status(201).json(allPosisi)
}

export const getAllHasilPosisiController = async (req:any, res:any) => {
    const nama = req.query.nama
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    const allPosisi = await getAllHasilPosisiService(nama, startDate, endDate)

    if(!allPosisi.status) {
        return res.status(400).json(allPosisi)
    }

    return res.status(201).json(allPosisi)
}

// export const getFilteredTime = async (req:any, res:any) => {
//     const startDate = req.query.startDate
//     const endDate = req.query.endDate
//     const filteredDate = await getFilteredDateService(startDate, endDate)
// }

export const statusPeserta = async (req:any, res:any) => {
    const sessionId = Number(req.params.id)
    
    const peserta = await statusPesertaService(sessionId, res)

    if(!peserta.status) {
        return res.status(400).json(peserta)
    }

    return res.status(201).json(peserta)
}

//hasil tes

export const hasilPesertaController = async (req:any, res:any) => {
    const role = req.user.role
    
    let posisi = req.query.posisi
    if (posisi === "Semua") {
        posisi = null
    }

    const startDate = req.query.startDate
    const endDate = req.query.endDate
    const nama = req.query.nama 
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit

    const peserta = await hasilPesertaService(role, page, limit, offset, posisi, nama, startDate, endDate)

    if (!(peserta.status)) {
        return res.status(400).json(peserta)
    }
    return res.status(201).json(peserta)
}

export const hasilTesController = async (req:any, res:any) => {
    const pesertaId = req.params.id
    const peserta = await hasilTesService(pesertaId)

    if (!(peserta.status)) {
        return res.status(400).json(peserta)
    }
    return res.status(201).json(peserta)
}

export const userExpired = async (req:any, res:any) => {
    const nik = req.params.nik
    const peserta = await userExpiredService(nik)
    // console.log(nik)

    if(!(peserta.status)) {
        return res.status(400).json(peserta)
    }

    return res.status(201).json(peserta)
}


