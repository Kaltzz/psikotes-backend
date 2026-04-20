import { postPesertaService, 
        getAllPesertaService, 
        getDetailPesertaService,
        statusPesertaService,
        hasilPesertaService,
        hasilTesService
    } from "../services/peserta.service"


export const postPeserta = async (req:any, res:any) => {
    const peserta = await postPesertaService(req.body, res)

    if (!peserta.status) {
        return res.status(400).json(peserta)
    }

    return res.status(201).json(peserta)
}

export const getAllPeserta = async (req: any, res:any) => {
    const peserta = await getAllPesertaService()

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

    return res.status(201). json(peserta)
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
    const peserta = await hasilPesertaService()

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