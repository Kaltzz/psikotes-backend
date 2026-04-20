import { PrismaClient } from "@prisma/client"

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
    return await prisma.peserta.create({
        data: {
            nama: post.nama,
            email: post.email,
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
            }
        },
        include: {
            testSession: true,
            token: true
        }
    })
}

export const getAllPesertaModel = async () => {
    return await prisma.peserta.findMany({
        select: {
            nama: true,
            id: true,
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
export const hasilPesertaModel = async () => {
    return await prisma.testSession.findMany({
        where: {
            statusTest: 2
        },
        select: {
            peserta: {
                select: {
                    id: true,
                    nama: true,
                    createdAt: true
                }
            }
        }
    })
}

export const hasilTesModel = async (id:number) => {
    return await prisma.peserta.findUnique({

        where: {
            id: Number(id)
        },
        
        select: {
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
                    tests: true
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
                    }
                }
            }
            
        }
    })
}

