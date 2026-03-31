import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

type CfitAnswerPayload = {
    questionId: number
    answers: string[]
    subtest: number
}

type DiscAnswerPayload = {
    sessionId: number
    questionIndex: number
    most: number
    least: number
}

type kraepelinAnswersPayload = {
    columnIndex: number
    answers: number[]
    correctAnswers: number
    wrongAnswers: number
    totalAnswered: number
}

type kraepelinLogPayload = {
    timestamp: Date
    event: string
    fromCol: number
    toCol: number
    fromPair: number
    toPair: number
}

type papikostikPayload = {
    groupId: number
    type: number
}

type n8nAnswersKraepelin = {
    id: number
    row_number: number
    kesimpulan: string
}

type msdtPayload = {
    groupId: number
    type: number
}

type mbtiPayload = {
    groupId: number
    type: number
}

export const answersCfitModel = async (data:any, sessionId: number) => {
    const payload: CfitAnswerPayload[] = data
    return await prisma.jawabanCfit.createMany({
            // data: [...data, sessionId],
            data: payload.map(item => ({
                ...item,
                sessionId: Number(sessionId)
                // sessionId: Number(sessionId) //ubah sessionId ke number!!!!
                })),
            skipDuplicates: true
        })
}

export const answersDiscModel = async (data:any, res:any) => {
    const payload: DiscAnswerPayload[] = data
    
    return await prisma.jawabanDisc.createMany({
        data: payload.map(item => ({
            ...item
        })),
        skipDuplicates: true
    })
}

export const answersKraepelinModel = async (kraepelinAnswers:any, sessionId:number) => {
    const payload: kraepelinAnswersPayload[] = kraepelinAnswers
    // console.log('ini answers',payload)
    return await prisma.jawabanKraepelin.createMany({
        data: payload.map(item => ({
            columnIndex: item.columnIndex,
            answers: item.answers.map((a: number | null) => a ?? -1),
            correctAnswers: item.correctAnswers,
            wrongAnswers: item.wrongAnswers,
            totalAnswered: item.totalAnswered,
            sessionId: sessionId
        })),
        skipDuplicates: true
    })
    
}

export const answersKraepelinLogModel = async (log:any, sessionId:number) => {
    const payload: kraepelinLogPayload[] = log
    // console.log('ini log:',payload)
    return await prisma.kraepelinLog.createMany({
        data: payload.map(item => ({
            timestamp: new Date(item.timestamp),
            event: item.event,
            fromCol: item.fromCol,
            toCol: item.toCol,
            fromPair: item.fromPair,
            toPair: item.toPair,
            sessionId: sessionId
        })),
        skipDuplicates: true
    })
}

export const answersPapikostickModel = async (data:any, sessionId: number, res:any) => {
    const payload: papikostikPayload[] = data
    console.log('ini data: ', data)
    return await prisma.jawabanPapikostik.createMany({
        data: payload.map(item => ({
            sessionId: sessionId,
            questionIndex: item.groupId,
            type: item.type
        }))
    })
}

export const n8nAnswersKraepelinModel = async (data:any) => {
    const payload: n8nAnswersKraepelin[] = data
    return await prisma.testing.createMany({
        data: payload.map(item=> ({
            pesertaId: item.id,
            row_number: item.row_number,
            kesimpulan: item.kesimpulan
        }))
    })
}

export const answersMsdtModel = async (sessionId:number, data:any) => {
    const payload: msdtPayload[] = data
    return await prisma.jawabanMsdt.createMany({
        data: payload.map(item => ({
            sessionId: sessionId,
            questionIndex: item.groupId,
            type: item.type
        }))
    })
} 

export const answersMbtiModel = async (sessionId: number, data: any) => {
    const payload: mbtiPayload[] = data

    return await prisma.jawabanMbti.createMany({
        data: payload.map(item => ({
            sessionId: sessionId,
            questionIndex: item.groupId,
            type: item.type
        }))
    })
}
