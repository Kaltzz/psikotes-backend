import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

export const getCfit1QuestionsContohModel = async (req:any, res:any) => {
    return await prisma.cfitQuestion.findMany({
        where: {
            isPractice: true,
            subtest: 1
        },
        select: {
            imagePath: true,
            options: {
                select: {
                    questionId: true,
                    label: true,
                    imagePath: true,
                }
            },
        }
    })
}

export const getCfit1QuestionsSoalModel = async (req:any, res:any) => {
    return await prisma.cfitQuestion.findMany({
        where: {
            isPractice: false,
            subtest: 1
        },
        select: {
            imagePath: true,
            options: {
                select: {
                    questionId: true,
                    label: true,
                    imagePath: true,
                }
            },
        }
    })
}

export const getCfit2QuestionsContohModel = async (req:any, res:any) => {
    return await prisma.cfitQuestion.findMany({
        where: {
            isPractice: true,
            subtest: 2
        },
        select: {
            imagePath: true,
            options: {
                select: {
                    questionId: true,
                    label: true,
                    imagePath: true,
                }
            },
        }
    })
}

export const getCfit2QuestionsSoalModel = async (req:any, res:any) => {
    return await prisma.cfitQuestion.findMany({
        where: {
            isPractice: false,
            subtest: 2
        },
        select: {
            imagePath: true,
            options: {
                select: {
                    questionId: true,
                    label: true,
                    imagePath: true,
                }
            },
        }
    })
}

export const getCfit3QuestionsContohModel = async (req:any, res:any) => {
    return await prisma.cfitQuestion.findMany({
        where: {
            isPractice: true,
            subtest: 3
        },
        select: {
            imagePath: true,
            options: {
                select: {
                    questionId: true,
                    label: true,
                    imagePath: true,
                }
            },
        }
    })
}

export const getCfit3QuestionsSoalModel = async (req:any, res:any) => {
    return await prisma.cfitQuestion.findMany({
        where: {
            isPractice: false,
            subtest: 3
        },
        select: {
            imagePath: true,
            options: {
                select: {
                    questionId: true,
                    label: true,
                    imagePath: true,
                }
            },
        }
    })
}

export const getCfit4QuestionsContohModel = async (req:any, res:any) => {
    return await prisma.cfitQuestion.findMany({
        where: {
            isPractice: true,
            subtest: 4
        },
        select: {
            imagePath: true,
            options: {
                select: {
                    questionId: true,
                    label: true,
                    imagePath: true,
                }
            },
        }
    })
}

export const getCfit4QuestionsSoalModel = async (req:any, res:any) => {
    return await prisma.cfitQuestion.findMany({
        where: {
            isPractice: false,
            subtest: 4
        },
        select: {
            imagePath: true,
            options: {
                select: {
                    questionId: true,
                    label: true,
                    imagePath: true,
                }
            },
        }
    })
}

export const getDiscQuestionsModel = async () => {
    return await prisma.discQuestion.findMany({
        select: {
            id: true,
            questionIndex: true,
            option: {
                select: {
                    questionId: true,
                    sentences: true,
                    optionIndex: true
                }
            }
        }
    })
}

export const getPapikostikQuestionsModel = async () => {
    return await prisma.papikostickQuestion.findMany({
        select: {
            questionIndex:true,
            option: {
                select: {
                    sentences: true,
                    optionType: true
                }
            }
        }
    })
}

export const getMsdtQuestionsModel = async () => {
    return await prisma.msdtQuestion.findMany({
        select: {
            questionIndex: true,
            option: {
                select: {
                    sentences: true,
                    optionType: true
                }
            }
        }
    })
}