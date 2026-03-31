import { 
    answersCfitModel, 
    answersDiscModel,
    answersKraepelinModel,
    answersKraepelinLogModel,
    answersPapikostickModel,
    n8nAnswersKraepelinModel,
    answersMsdtModel,
    answersMbtiModel
 } from "../models/answers.model"

type DiscAnswerInput = {
    groupId: number
    questionIndex: number
}

type DiscAnswerPayload = {
    questionId: number
    most: string
    least: string
}

type n8nKraepelinAnswers = {
    id: number
}

// type logPayload = {
//     timestamp: Date
//     event: string
//     fromCol: number
//     toCol: number
//     fromPair: number
//     toPair: number
// }

export const answersCfitService = async (data:any, res:any, sessionId:number) => {
    try{
        const answers = await answersCfitModel(data, sessionId)
    // console.log('answers service: ', answers)
    return ({
        status: true,
        message: 'berhasil menyimpan jawaban',
        data: answers
    })
    } catch (error) {
        // console.log('ini error', error)
        return({
            status: false,
            message: error
        })
    }
}

export const answersDiscService = async (data:any, sessionId: number, res:any) => {
    const answersMost: DiscAnswerInput[] = data.most
    const most = answersMost.map(item=>({
        ...item,
        sessionId: Number(sessionId)
    }))

    const answersLeast: DiscAnswerInput[] = data.least
    const least = answersLeast.map(item=>({
        ...item,
        sessionId: Number(sessionId)
    }))
    const mergedArray = most.map( item1 => {
        const leastData = least.find(item2 => item2.groupId === item1.groupId)
        return ({
            sessionId: item1.sessionId,
            questionIndex: item1.groupId,
            most: item1.questionIndex,
            least: leastData?.questionIndex,
        })
    })

    // const answers = await answersDiscModel(mergedArray, res)
    
    try {
        const answers = await answersDiscModel(mergedArray, res)
        return({
            status: true,
            message: 'berhasil menyimpan jawaban',
            data: answers
        })
    } catch(error) {
        return ({
            status: false,
            message: error
        })
    }
}

export const answersKraepelinService = async (data: any, sessionId: number, res:any) => {
    
    try {
        const kraepelinAnswers = data.columnResults
        const log = data.auditLog
        const answers = await answersKraepelinModel(kraepelinAnswers, sessionId)
        const answersLog = await answersKraepelinLogModel(log, sessionId)
        
        return {
            status: true,
            message: 'jawaban berhasil dikirim',
            dataAnswers: answers,
            dataLog: answersLog
        }
    } catch (error) {
        return {
            status: false,
            message: error
        }
    }

    // const answers = data.columnResults
    // const summary = data.summary
    // const log:logPayload[] = data.auditLog
    // const newLog = {
    //     data: log.map(item => ({
    //         ...item,
    //     })),
    //     completedAt: data.completedAt
    // }
    // console.log(newLog)

    // console.log(answers, summary, log)
    // console.log(data.columnResults[0].answers)
}

export const answersPapikostickService = async (data:any, sessionId: number, res:any) => {
    try {
        const papikostik = await answersPapikostickModel(data, sessionId, res)
        console.log('ini service data: ', data)
        return {
            status: true,
            message: "Jawaban Papikostik berhasil disimpan",
            data: papikostik 
        }
    } catch (error) {
        return {
            status: false,
            message: error
        }
    }
    
}

export const n8nAnswersKraepelinService = async (data:any) => {
    try {
        const kraepelin = await n8nAnswersKraepelinModel(data)
        const dataKraepelin: n8nKraepelinAnswers[] = data 

        if(kraepelin.count !== data.length) {
            return {
                status: false,
                message: 'Gagal'
            }
        }
        return {
            status: true,
            message: 'Berhasil',
            data: {
                status: 'success',
                id: dataKraepelin.map(item => ({
                    id: item.id
                }))
            }
        }
    } catch(error) {
        return {
            status: false,
            message: 'gagal1'
        }
    }
    
}

export const answersMsdtService = async (sessionId: number, data:any) => {
    try {
        const msdt = await answersMsdtModel(sessionId, data)

        return ({
            status: true,
            message: "Jawaban MSDT berhasil ditambahkan",
            data: msdt
        })

    } catch (error) {
        return({
            status: false,
            message: error
        })
    }
}

export const answersMbtiService = async (sessionId: number, data: any) => {
    try {
        const msdt = await answersMbtiModel(sessionId, data)

        return ({
            status: true,
            message: "Data jawaban berhasil dikirim",
            data: msdt
        })
    } catch (error) {
        return({
            status: false,
            message: error
        })
    }
}