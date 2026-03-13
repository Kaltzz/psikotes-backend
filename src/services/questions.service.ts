import {
    getCfit1QuestionsContohModel, 
    getCfit1QuestionsSoalModel,
    getCfit2QuestionsContohModel,
    getCfit2QuestionsSoalModel,
    getCfit3QuestionsContohModel,
    getCfit3QuestionsSoalModel,
    getCfit4QuestionsContohModel,
    getCfit4QuestionsSoalModel,
    getDiscQuestionsModel
} from '../models/questions.model'

export const getCfit1QuestionsContohService = async (req:any, res:any) => {
    try{
        const questions = await getCfit1QuestionsContohModel(req, res)

        return({
            status: true,
            message: 'berhasil mengambil data contoh cfit 1',
            data: questions
        })
    } catch(error) {
        return({
            status: false,
            message: error,
        })
    }
}

export const getCfit1QuestionsSoalService = async (req:any, res:any) => {
    try {
        const questions = await getCfit1QuestionsSoalModel(req, res)

        return({
            status: true,
            message: 'Berhasil mengambil data soal cfit 1',
            data: questions
        })
    } catch (error) {
        return({
            status: false,
            message: error
        })
    }
}

export const getCfit2QuestionsContohService = async (req:any, res:any) => {
    try{
        const questions = await getCfit2QuestionsContohModel(req, res)

        return({
            status: true,
            message: 'berhasil mengambil data contoh cfit 2',
            data: questions
        })
    } catch(error) {
        return({
            status: false,
            message: error,
        })
    }
}

export const getCfit2QuestionsSoalService = async (req:any, res:any) => {
    try{
        const questions = await getCfit2QuestionsSoalModel(req, res)

        return({
            status: true,
            message: 'berhasil mengambil data soal cfit 2',
            data: questions
        })
    } catch(error) {
        return({
            status: false,
            message: error,
        })
    }
} 

export const getCfit3QuestionsContohService = async (req:any, res:any) => {
    try{
        const questions = await getCfit3QuestionsContohModel(req, res)

        return({
            status: true,
            message: 'berhasil mengambil data contoh cfit 3',
            data: questions
        })
    } catch(error) {
        return({
            status: false,
            message: error,
        })
    }
}

export const getCfit3QuestionsSoalService = async (req:any, res:any) => {
    try{
        const questions = await getCfit3QuestionsSoalModel(req, res)

        return({
            status: true,
            message: 'berhasil mengambil data soal cfit 3',
            data: questions
        })
    } catch(error) {
        return({
            status: false,
            message: error,
        })
    }
} 

export const getCfit4QuestionsContohService = async (req:any, res:any) => {
    try{
        const questions = await getCfit4QuestionsContohModel(req, res)

        return({
            status: true,
            message: 'berhasil mengambil data contoh cfit 4',
            data: questions
        })
    } catch(error) {
        return({
            status: false,
            message: error,
        })
    }
}

export const getCfit4QuestionsSoalService = async (req:any, res:any) => {
    try{
        const questions = await getCfit4QuestionsSoalModel(req, res)

        return({
            status: true,
            message: 'berhasil mengambil data soal cfit 4',
            data: questions
        })
    } catch(error) {
        return({
            status: false,
            message: error,
        })
    }
}

export const getDiscQuestionsService = async (req:any, res:any) => {
    try{
        const questions = await getDiscQuestionsModel(req, res)

        // const discs = questions.map((item) => {
        //     const {id, sentences, questionIndex, optionIndex} = item
        //     const disc = {
        //         id: id, 
        //         questionIndex: questionIndex, 
        //         // questions: {
        //         //     sentences: sentences, 
        //         //     optionIndex: optionIndex
        //         // }
        //     }
        //     return disc
        // })

        return({
            status: true,
            message: 'berhasil mengambil data soal disc',
            data: questions
        })
    } catch(error) {
        return({
            status: false,
            message: error,
        })
    }
}