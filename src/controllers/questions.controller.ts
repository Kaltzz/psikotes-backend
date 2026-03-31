import { 
    getCfit1QuestionsContohService, 
    getCfit1QuestionsSoalService,
    getCfit2QuestionsContohService,
    getCfit2QuestionsSoalService,
    getCfit3QuestionsContohService,
    getCfit3QuestionsSoalService,
    getCfit4QuestionsContohService,
    getCfit4QuestionsSoalService,
    getDiscQuestionsService,
    getPapikostikQuestionsService,
    getMsdtQuestionsService,
    getMbtiQuestionsService
} from '../services/questions.service'

//subtest 1

export const getCfit1QuestionsContoh = async (req:any, res:any) => {
    const questions = await getCfit1QuestionsContohService(req, res)

    if(!(questions.status)) {
        return res.status(400).json(questions)
    }

    return res.status(201).json(questions)
}

export const getCfit1QuestionsSoal = async (req:any, res:any) => {
    const questions = await getCfit1QuestionsSoalService(req, res)

    if(!(questions.status)) {
        return res.status(400).json(questions)
    }

    return res.status(201).json(questions)
}

//subtest 2

export const getCfit2QuestionsContoh = async (req:any, res:any) => {
    const questions = await getCfit2QuestionsContohService(req, res)

    if(!(questions.status)) {
        return res.status(400).json(questions)
    }

    return res.status(201).json(questions)
}

export const getCfit2QuestionsSoal = async (req:any, res:any) => {
    const questions = await getCfit2QuestionsSoalService(req, res)

    if(!(questions.status)) {
        return res.status(400).json(questions)
    }

    return res.status(201).json(questions)
}

//subtest 3

export const getCfit3QuestionsContoh = async (req:any, res:any) => {
    const questions = await getCfit3QuestionsContohService(req, res)

    if(!(questions.status)) {
        return res.status(400).json(questions)
    }

    return res.status(201).json(questions)
}

export const getCfit3QuestionsSoal = async (req:any, res:any) => {
    const questions = await getCfit3QuestionsSoalService(req, res)

    if(!(questions.status)) {
        return res.status(400).json(questions)
    }

    return res.status(201).json(questions)
}

//subtest 4

export const getCfit4QuestionsContoh = async (req:any, res:any) => {
    const questions = await getCfit4QuestionsContohService(req, res)

    if(!(questions.status)) {
        return res.status(400).json(questions)
    }

    return res.status(201).json(questions)
}

export const getCfit4QuestionsSoal = async (req:any, res:any) => {
    const questions = await getCfit4QuestionsSoalService(req, res)

    if(!(questions.status)) {
        return res.status(400).json(questions)
    }

    return res.status(201).json(questions)
}

//DISC
export const getDiscQuestions = async (req:any, res:any) => {
    const questions = await getDiscQuestionsService(req, res)
    
    if(!(questions.status)) {
        return res.status(400).json(questions)
    }

    return res.status(201).json(questions)
}

//Papikostik
export const getPapikostikQuestions = async (req:any, res:any) => {
    const questions = await getPapikostikQuestionsService(req, res)

    if(!(questions.status)) {
        return res.status(400).json(questions)
    }

    return res.status(201).json(questions)
}

export const getMsdtQuestions = async (req:any, res:any) => {
    const questions = await getMsdtQuestionsService(req, res)

    if(!(questions.status)) {
        return res.status(400).json(questions)
    }

    return res.status(201).json(questions)
}

export const getMbtiQuestions = async (req:any, res:any) => {
    const questions = await getMbtiQuestionsService(req, res)

    if(!(questions.status)) {
        return res.status(400).json(questions)
    }

    return res.status(201).json(questions)
}