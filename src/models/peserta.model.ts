import { PrismaClient, Role, Unit } from "@prisma/client"
// import { prisma } from '../utils/prisma'

const prisma = new PrismaClient

const dateConverter = (date: any) => {
    const dateParser = new Date(date);
        const witaFormatter = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Makassar',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
        });
        
        const time = witaFormatter.format(dateParser).split(", ")
        const dateTest = time[0]+':'+time[1]+' WITA'

    return dateTest
}

export const postPesertaModel = async (post:any, res:any, id:any) => {
    const expiredAt = new Date()
    expiredAt.setMonth(expiredAt.getMonth() + 3)
    return await prisma.peserta.create({
        data: {
            nama: post.nama,
            email: post.email,
            nik: post.nik,
            jenisKelamin: post.jenisKelamin,
            unit: post.unit,
            usia: post.usia,
            pendidikanTerakhir: post.pendidikanTerakhir,
            jurusan: post.jurusan,
            posisi: post.posisi,
            tokenId: id,
            tanggalLahir: new Date(post.tanggalLahir),
            testSession: {
                create : [
                    {
                    token: post.tokenPeserta,
                    statusTest: 0
                }
                ]
            },
            statusExpired: {
                create: 
                    {
                        isExpired: false,
                        expiredAt: expiredAt
                    }
                
            }
            
        },
        include: {
            testSession: true,
            token: true
        }
    })
}

export const getCountAllPesertaModel = async () => {
    return await prisma.peserta.count()
}

export const getAllPesertaModel = async (
    role:string, 
    page:number, 
    limit:number, 
    offset:number, 
    posisi?:string, 
    nama?:string, 
    startDate?:string, 
    endDate?:string
) => {
    return await prisma.peserta.findMany({
        where: {
            unit: role as Unit,
            ...(posisi ? {posisi}: {}),
            ...(nama ? {nama: {contains:nama, mode:'insensitive'} } : {}),
            ...(startDate || endDate ? { 
                createdAt: { 
                    ...(startDate ? { gte: new Date(startDate) } : {}),
                    ...(endDate ? { lte: new Date(endDate) } : {})
                } 
            } : {}),
        },
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            nama: true,
            id: true,
            createdAt:true,
            posisi: true,
            // jenisKelamin: true,
            // usia: true,
            // pendidikanTerakhir: true,
            // jurusan: true,
            testSession: {
                select: {
                    statusTest: true
                }
            }
        }
    })
}

export const getAllPesertaModelAdmin = async (
    page: number, 
    limit: number, 
    offset:number, 
    posisi?:string, 
    nama?:string,
    startDate?: string,
    endDate?: string
) => {
    return await prisma.peserta.findMany({
        take: limit,
        skip: offset,
        where: {
            ...(posisi ? {posisi}: {}),
            ...(nama ? {nama: {contains:nama, mode:'insensitive'} } : {}),
            ...(startDate || endDate ? { 
                createdAt: { 
                    ...(startDate ? { gte: new Date(startDate) } : {}),
                    ...(endDate ? { lte: new Date(endDate) } : {})
                } 
            }    : {}),
        },
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            nama: true,
            id: true,
            createdAt:true,
            posisi: true,
            // jenisKelamin: true,
            // usia: true,
            // pendidikanTerakhir: true,
            // jurusan: true,
            testSession: {
                select: {
                    statusTest: true
                }
            }
        }
    })
}

export const allDataAdminModel = async (
    posisi?: string, 
    nama?:string, 
    startDate?:string, 
    endDate?:string
) => {
    return await prisma.peserta.count({
        where: {
            ...(posisi ? {posisi}: {}),
            ...(nama ? {nama: {contains:nama, mode:'insensitive'} } : {}),
            ...(startDate || endDate ? { 
                createdAt: { 
                    ...(startDate ? { gte: new Date(startDate) } : {}),
                    ...(endDate ? { lte: new Date(endDate) } : {})
                } 
            } : {}),
        }
    })
}

export const allDataModel = async (
    role:string, 
    posisi?:string, 
    nama?:string, 
    startDate?:string, 
    endDate?:string
) => {
    return await prisma.peserta.count(
        {
        where: {
            unit: role as Unit,
            ...(posisi ? {posisi}: {}),
            ...(nama ? {nama: {contains:nama, mode:'insensitive'} } : {}),
            ...(startDate || endDate ? { 
                createdAt: { 
                    ...(startDate ? { gte: new Date(startDate) } : {}),
                    ...(endDate ? { lte: new Date(endDate) } : {})
                } 
            } : {}),
        }
    }
)
}

export const getDetailPesertaModel = async (id:number, res:any) => {
    return await prisma.peserta.findUnique({
        where: {
            id: id
        },
        select: {
            nama: true,
            jenisKelamin: true,
            usia: true,
            pendidikanTerakhir: true,
            jurusan: true,

            testSession: {
            select: {
                statusTest: true
                }
            }
        },            
    })
}

export const getAllPosisiModel = async (nama?:string, startDate?:string, endDate?:string) => {
    return await prisma.peserta.groupBy({
        by: ['posisi'],
        _count: {
            posisi: true
        },
        where: {
            // ...(posisi ? {posisi}: {}),
            ...(nama ? {nama: {contains:nama, mode:'insensitive'} } : {}),
            ...(startDate || endDate ? { 
                createdAt: { 
                    ...(startDate ? { gte: new Date(startDate) } : {}),
                    ...(endDate ? { lte: new Date(endDate) } : {})
                } 
            } : {}),
        }
    })
}

export const getAllHasilPosisiModel = async (nama?:string, startDate?:string, endDate?:string) => {
    return await prisma.peserta.groupBy({
        by: ['posisi'],
        _count: {
            posisi: true
        },
        where: {
            // ...(posisi ? {posisi}: {}),
            testSession: { some: { statusTest: 2 } },
            ...(nama ? {nama: {contains:nama, mode:'insensitive'} } : {}),
            ...(startDate || endDate ? { 
                createdAt: { 
                    ...(startDate ? { gte: new Date(startDate) } : {}),
                    ...(endDate ? { lte: new Date(endDate) } : {})
                } 
            } : {}),
        }
    })
}

// export const getFilteredDateModel = async (startDate?:string, endDate?:string) => {
//     return prisma.peserta.
// }

export const statusPesertaModel = async (sessionId: number, res:any) => {
    return await prisma.testSession.update({
        where: {
            id: sessionId
        },
        data: {
           statusTest: {increment: 1} 
        }
    })
}

//Hasil Tes
export const hasilPesertaModel = async (
    role:string, 
    page:number, 
    limit:number, 
    offset:number, 
    posisi?:string, 
    nama?:string, 
    startDate?:string, 
    endDate?:string
) => {
    return await prisma.testSession.findMany({
        where: {
            statusTest: 2,
            peserta: {
                unit: role as Unit,
                ...(posisi ? {posisi}: {}),
                ...(nama ? {nama: {contains:nama, mode:'insensitive'} } : {}),
                ...(startDate || endDate ? { 
                    createdAt: { 
                        ...(startDate ? { gte: new Date(startDate) } : {}),
                        ...(endDate ? { lte: new Date(endDate) } : {})
                    } 
                } : {}),
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            pesertaId: true,
            peserta: {
                select: {
                    id: true,
                    nama: true,
                    createdAt: true,
                    posisi: true
                }
            }
        }
    })
    
}

export const hasilPesertaModelAdmin = async (
    page: number, 
    limit: number, 
    offset:number, 
    posisi?:string, 
    nama?:string,
    startDate?: string,
    endDate?: string
) => {
    return await prisma.testSession.findMany({
        take: limit,
        skip: offset,
        where: {
            statusTest: 2,
            peserta: {
                ...(posisi ? {posisi}: {}),
                ...(nama ? {nama: {contains:nama, mode:'insensitive'} } : {}),
                ...(startDate || endDate ? { 
                    createdAt: { 
                        ...(startDate ? { gte: new Date(startDate) } : {}),
                        ...(endDate ? { lte: new Date(endDate) } : {})
                    } 
                } : {}),
            }
            
        },
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            pesertaId: true,
            peserta: {
                select: {
                    id: true,
                    nama: true,
                    createdAt: true,
                    posisi: true,
                }
            }
        }
    })
}

export const allDataHasilModelAdmin = async (
    posisi?: string, 
    nama?:string, 
    startDate?:string, 
    endDate?:string
) => {
    return await prisma.testSession.count({
        where: {
            statusTest: 2,
            peserta: {
                ...(posisi ? {posisi}: {}),
                ...(nama ? {nama: {contains:nama, mode:'insensitive'} } : {}),
                ...(startDate || endDate ? { 
                    createdAt: { 
                        ...(startDate ? { gte: new Date(startDate) } : {}),
                        ...(endDate ? { lte: new Date(endDate) } : {})
                    } 
                } : {}),
            }
        }
    })
}

export const allDataHasilModel = async (
    role:string,
    posisi?: string, 
    nama?:string, 
    startDate?:string, 
    endDate?:string
) => {
    return await prisma.testSession.count({
        where: {
            statusTest: 2,
            peserta: {
                unit: role as Unit,
                ...(posisi ? {posisi}: {}),
                ...(nama ? {nama: {contains:nama, mode:'insensitive'} } : {}),
                ...(startDate || endDate ? { 
                    createdAt: { 
                        ...(startDate ? { gte: new Date(startDate) } : {}),
                        ...(endDate ? { lte: new Date(endDate) } : {})
                    } 
                } : {}),
            }
        }
    })
}

export const hasilTesModel = async (id: number) => {
  return await prisma.peserta.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      nama: true,
      email: true,
      jenisKelamin: true,
      usia: true,
      pendidikanTerakhir: true,
      jurusan: true,
      unit: true,
      posisi: true,
      tanggalLahir: true,
      createdAt: true,
      token: {
        select: {
          tests: true,
        },
      },
      discScoring: {
        select: {
            id: true,
            maskType: true,
            maskCharacteristics: true,
            coreType: true,
            coreCharacteristics: true,
            mirrorType: true,
            mirrorCharacteristics: true,
            personalityDescription:true,
            jobMatch: true 
        }
      },
      papikostickScoring: {
        select: {
            id: true,
            sub1: true,
            sub2: true,
            sub3: true,
            sub4: true,
            sub5: true,
            sub6: true,
            sub7: true,
            sub8: true,
            sub9: true,
            sub10: true,
            sub11: true,
            sub12: true,
            sub13: true,
            sub14: true,
            sub15: true,
            sub16: true,
            sub17: true,
            sub18: true,
            sub19: true,
            sub20: true
        }
      },
      msdtScoring: {
        select: {
            id: true,
            hasilTest: true,
            mainExplanation1: true,
            mainExplanation2: true,
            description: true,
            status: true
        }
      },
      mbtiScoring: {
        select: {
            id: true,
            karakterTalent: true,
            uraianKarakterTalent: true
        }
      },
      kraepelinScoring: {
        select: {
            id: true,
            skorKecepatan: true,
            skorKetelitian: true,
            skorKeajegan: true,
            skorKetahanan: true,
            kecepatanVariabel: true,
            ketelitianVariabel: true,
            keajeganVariabel: true,
            ketahananVariabel: true,
            totalPerLajur: true
        }
      },
      testSession: {
        select: {
            jawabanCfit: {
                select: {
                    id: true,
                    subtest: true,
                    questionId: true,
                    answers: true
                }
            },
        }
      }
    },
  });
};

export const userExpiredModel = async (nik:string) => {
    return await prisma.peserta.findFirst({
    where: {
        nik: nik,
        testSession: {
            some: {
                statusTest: 2
            }
        }
    },
    select: {
        id: true,
        statusExpired: {
            where: { isExpired: false },  
            orderBy: { createdAt: 'desc' },
            take: 1,
            select: {
                id: true,        
                pesertaId: true,
                isExpired: true,
                createdAt: true,
                expiredAt: true
            }
        }
    }
})
}

export const setTrueModel = async (statusExpiredId: number) => {
    return await prisma.statusExpired.update({
        where: {
            id: statusExpiredId
        },
        data: {
            isExpired: true
        }
    })
}

export const newTestSessionModel = async (pesertaId:number, token:number,) => {
    return await prisma.testSession.create({
        data: {
            pesertaId: pesertaId,
            token: token.toString(),
            statusTest: 0
        },
        include: {
            peserta: {
                include: {
                    token: {
                        select: {
                            tests: true
                        }
                    }
                }
            }
        }
    })
}