import { 
    answersCfitService, 
    answersDiscService,
    answersKraepelinService,
    n8nAnswersKraepelinService
} from "../services/answers.service"

// CFIT
export const answersCfit = async (req:any, res:any) => {
    const sessionId = req.params.id
    const answers = await answersCfitService(req.body, res, sessionId)
    if(!answers.status) {
        return res.status(400).json(answers)
    }
    return res.status(201).json(answers)
}

// DISC
export const answersDisc = async (req:any, res:any) => {
    const sessionId = req.params.id
    const data = req.body
    // console.log('id:', sessionId)
    // console.log('data', data)
    const answers = await answersDiscService(data, sessionId, res)

    if(!answers.status) {
        return res.status(400).json(answers)
    }

    return res.status(201).json(answers)
}

//kraepelin
export const answersKraepelin = async (req:any, res:any) => {
    const sessionId = parseInt(req.params.id)
    const data = req.body
    const answers = await answersKraepelinService(data, sessionId, res)

    if(!(answers.status)) {
        return res.status(400).json(answers)
    }

    return res.status(201).json(answers)
}

export const n8nAnswersKraepelin = async (req:any, res:any) => {
    const data = req.body.data
    const kraepelin = await n8nAnswersKraepelinService(data)

    if (!(kraepelin.status)) {
        return res.status(400).json(kraepelin)
    }
    
    return res.status(201).json(kraepelin)
    // console.log("ini kraepelin",data)
}