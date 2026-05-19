import { postPesertaService, 
        getAllPesertaService, 
        getDetailPesertaService,
        statusPesertaService,
        hasilPesertaService,
        hasilTesService,
        userExpiredService,
        getAllPosisiService,
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
    const posisi = req.query.posisi
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit

    const peserta = await getAllPesertaService(role, page, limit, offset, posisi)

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
    const posisi = await getAllPosisiService()

    if(!posisi.status) {
        return res.status(400).json(posisi)
    }

    return res.status(201).json(posisi)
}

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
    const peserta = await hasilPesertaService(role)

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


