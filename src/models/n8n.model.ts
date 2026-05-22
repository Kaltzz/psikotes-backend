import { PrismaClient, Tests } from "@prisma/client"
// import { prisma } from '../utils/prisma'

const prisma = new PrismaClient()

export const n8nCfitModel = async (id:number) => {
    return await prisma.peserta.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            nama: true,
            email:true,
            tanggalLahir: true,
            createdAt: true,
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
            tanggalLahir: true,
            createdAt: true,
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
            tanggalLahir: true,
            createdAt: true,
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
                            id: true,
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
            tanggalLahir: true,
            createdAt: true,
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
            tanggalLahir: true,
            createdAt: true,
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

export const n8nMbtiModel = async (id: number) => {
    return await prisma.peserta.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            nama: true,
            email:true,
            tanggalLahir: true,
            createdAt: true,
            jenisKelamin: true,
            usia: true,
            pendidikanTerakhir: true,
            unit: true,
            posisi:true,
            jurusan: true,
            testSession: {
                select: {
                    jawabanMbti: {
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

export const getAllCfitAnswersModel = async(date:string) => {
    return prisma.testSession.findMany({
        where: {
            statusTest: 2,
            createdAt: {
                gte: new Date(date)
            },
            peserta: {
                token: {
                    tests: {
                        has: "CFIT" as Tests
                    } 
                }
            }
        },
        select: {
            id: true,
            pesertaId: true,
            peserta: {
                select: {
                    nama: true,
                    email:true,
                    tanggalLahir: true,
                    createdAt: true,
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
            }
        }
    })
}

export const getAllKraepelinAnswersModel = async(date:string) => {
    return prisma.testSession.findMany({
        where: {
            statusTest: 2,
            createdAt: {
                gte: new Date(date)
            },
            peserta: {
                token: {
                    tests: {
                        has: "KRAEPELIN" as Tests
                    } 
                }
            }
        },
        select: {
            id: true,
            pesertaId: true,
            peserta: {
                select: {
                    nama: true,
                    email:true,
                    tanggalLahir: true,
                    createdAt: true,
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
            }
        }
    })
}

export const getAllDiscAnswersModel = async (date:string) => {
    return prisma.testSession.findMany({
        where: {
            statusTest: 2,
            createdAt: {
                gte: new Date(date)
            },
            peserta: {
                token: {
                    tests: {
                        has: "DISC" as Tests
                    } 
                }
            }
        },
        select: {
            id: true,
            pesertaId: true,
            peserta: {
                select: {
                    nama: true,
                    email:true,
                    tanggalLahir: true,
                    createdAt: true,
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
                                    id: true,
                                    questionIndex: true,
                                    most: true, 
                                    least: true
                                }
                            },
                        }
                    }
                }
            }
        }
    })
}

export const getAllPapikostickAnswersModel = async (date:string) => {
    return prisma.testSession.findMany({
        where: {
            statusTest: 2,
            createdAt: {
                gte: new Date(date)
            },
            peserta: {
                token: {
                    tests: {
                        has: "PAPIKOSTICK" as Tests
                    } 
                }
            }
        },
        select: {
            id: true,
            pesertaId: true,
            peserta: {
                select: {
                    nama: true,
                    email:true,
                    tanggalLahir: true,
                    createdAt: true,
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
            }
        }
    })
}

export const getAllMsdtAnswersModel = async (date:string) => {
    return prisma.testSession.findMany({
        where: {
            statusTest: 2,
            createdAt: {
                gte: new Date(date)
            },
            peserta: {
                token: {
                    tests: {
                        has: "MSDT" as Tests
                    } 
                }
            }
        },
        select: {
            id: true,
            pesertaId: true,
            peserta: {
                select: {
                    nama: true,
                    email:true,
                    tanggalLahir: true,
                    createdAt: true,
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
            }
        }
    })
}

export const getAllMbtiAnswersModel = async (date:string) => {
    return prisma.testSession.findMany({
        where: {
            statusTest: 2,
            createdAt: {
                gte: new Date(date)
            },
            peserta: {
                token: {
                    tests: {
                        has: "MBTI" as Tests
                    } 
                }
            }
        },
        select: {
            id: true,
            pesertaId: true,
            peserta: {
                select: {
                    nama: true,
                    email:true,
                    tanggalLahir: true,
                    createdAt: true,
                    jenisKelamin: true,
                    usia: true,
                    pendidikanTerakhir: true,
                    unit: true,
                    posisi:true,
                    jurusan: true,
                    testSession: {
                        select: {
                            jawabanMbti: {
                                select: {
                                    questionIndex: true,
                                    type: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}