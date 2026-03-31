import {
    triggerN8NService,
    n8nCfitService,
    n8nKraepelinService, 
    n8nDiscService,
    n8nPapikostikService,
    n8nMsdtService,
    n8nMbtiService
} from "../services/n8n.service" 

export const triggerN8N = async (req: any, res: any) => {
    const pesertaId = req.params.pesertaId;
    const tests = req.body.tests
    console.log('tests controller: ', tests)
    // Response ke frontend SEGERA
    res.status(200).json({
        status: true,
        message: 'N8N trigger initiated',
    });

    // Trigger N8N di background (non-blocking)
    triggerN8NService(Number(pesertaId), tests)
        .then(result => {
            if (result.status) {
                console.log(`✅ N8N triggered for peserta ${pesertaId} dan ${result.data}`);
            } else {
                console.error(`❌ N8N trigger failed for peserta ${pesertaId}`);
            }
        })
        .catch(error => {
            console.error(`❌ Unexpected error:`, error);
        });
};

export const n8nCfit = async (req:any, res:any) => {
    const pesertaId = req.params.pesertaId
    const n8n = await n8nCfitService(req, res, pesertaId)

    if (!(n8n.status)) {
        return res.status(400).json(n8n)
    }
    // console.log(n8n)

    return res.status(201).json(n8n)
}

export const n8nKraepelin = async (req:any, res:any) => {
    const pesertaId = req.params.pesertaId
    const n8n = await n8nKraepelinService(req, res, pesertaId)

    if (!(n8n.status)) {
        return res.status(400).json(n8n)
    }
    // console.log(n8n)

    return res.status(201).json(n8n)
}

export const n8nDisc = async (req:any, res:any) => {
    const pesertaId = req.params.pesertaId
    const n8n = await n8nDiscService(req, res, pesertaId)

    if (!(n8n.status)) {
        return res.status(400).json(n8n)
    }
    // console.log(n8n)

    return res.status(201).json(n8n)
}

export const n8nPapikostik = async (req:any, res:any) => {
    const pesertaId = req.params.pesertaId
    const n8n = await n8nPapikostikService(req, res, pesertaId)

    if (!(n8n.status)) {
        return res.status(400).json(n8n)
    }
    
    return res.status(201).json(n8n)
}

export const n8nMsdt = async (req:any, res:any) => {
    const pesertaId = req.params.pesertaId
    const n8n = await n8nMsdtService(req, res, pesertaId)
    
    if (!(n8n.status)) {
        return res.status(400).json(n8n)
    }

    return res.status(201).json(n8n)
}

export const n8nMbti = async (req:any, res:any) => {
    const pesertaId = req.params.pesertaId
    const n8n = await n8nMbtiService(req, res, pesertaId)

    if (!(n8n.status)) {
        return res.status(400).json(n8n)
    }

    return res.status(201).json(n8n)
}