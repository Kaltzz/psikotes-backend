import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const n8nCfitModel = async (id:number) => {
    return await prisma.peserta.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            nama: true,
            email:true,
            jenisKelamin: true,
            usia: true,
            pendidikanTerakhir: true,
            unit: true,
            posisi:true,
            jurusan: true,
            testSession: {
                select: {
                    jawabanCfit: {
                        select: {
                            id: true,
                            sessionId: true,
                            subtest: true,
                            questionId: true,
                            answers: true
                        }
                    }
                }
            }
        }
    })
}

export const n8nKraepelinModel = async (id:number) => {
    return prisma.peserta.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            nama: true,
            email:true,
            jenisKelamin: true,
            usia: true,
            pendidikanTerakhir: true,
            unit: true,
            posisi:true,
            jurusan: true,
            testSession: {
                select: {
                    jawabanKraepelin: {
                        select: {
                            columnIndex: true,
                            answers: true,
                            correctAnswers: true,
                            wrongAnswers: true,
                            totalAnswered: true
                        }
                    },
                    kraepelinLog: {
                        select: {
                            timestamp: true,
                            event: true,
                            fromCol: true,
                            toCol: true,
                            fromPair: true,
                            toPair: true
                        }
                    }
                }
            }
        }
    })
}

export const n8nDiscModel = async (id: number) => {
    return prisma.peserta.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            nama: true,
            email:true,
            jenisKelamin: true,
            usia: true,
            pendidikanTerakhir: true,
            unit: true,
            posisi:true,
            jurusan: true,
            testSession: {
                select: {
                    jawabanDisc: {
                        select: {
                            questionIndex: true,
                            most: true, 
                            least: true
                        }
                    },
                }
            }
        }
    })
}

export const n8nPapikostikModal = async (id:number) => {
    return prisma.peserta.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            nama: true,
            email:true,
            jenisKelamin: true,
            usia: true,
            pendidikanTerakhir: true,
            unit: true,
            posisi:true,
            jurusan: true,
            testSession: {
                select: {
                    jawabanPapikostik: {
                        select:{
                            questionIndex: true,
                            type: true
                        }
                    }
                }
            }
        }
    })
}

export const n8nMsdtModel = async (id: number) => {
    return prisma.peserta.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            nama: true,
            email:true,
            jenisKelamin: true,
            usia: true,
            pendidikanTerakhir: true,
            unit: true,
            posisi:true,
            jurusan: true,
            testSession: {
                select: {
                    jawabanMsdt: {
                        select: {
                            questionIndex: true,
                            type: true
                        }
                    }
                }
            }
        }
    })
}