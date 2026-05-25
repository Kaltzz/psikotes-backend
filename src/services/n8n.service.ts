import { PrismaClient } from "@prisma/client";
import { 
    n8nCfitModel,
    n8nKraepelinModel,
    n8nDiscModel,
    n8nPapikostikModal,
    n8nMsdtModel,
    n8nMbtiModel,
    getAllCfitAnswersModel,
    getAllKraepelinAnswersModel,
    getAllDiscAnswersModel,
    getAllPapikostickAnswersModel,
    getAllMsdtAnswersModel,
    getAllMbtiAnswersModel,
    postPapikostickScoringModel,
    postDiscScoringModel
} from "../models/n8n.model"
import { addToN8NQueue } from "../utils/n8nqueue";

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

const dateBornConverter = (date: any) => {
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
        const dateTest = time[0]

    return dateTest
}

const unitMap: Record<string, string> = {
  MPP: 'PT. Makassar Putra Prima',
  ACS: 'PT. Aptana Citra Solusindo',
  MMPP: 'PT. Makassar Megaputra Prima',
  IMP: 'PT. Indo Mega Prima',
  PPH: 'PT. Putra Prima Hotel',
  SMP: 'PT. Samamaju Prima',
}

// triggerN8NService.ts — hapus setTimeout 3000, pindah logika ke sini
export const triggerN8NService = async (pesertaId: number, tests: string) => {
  const N8N_WEBHOOK_URL_PRODUCTION = process.env.N8N_WEBHOOK_URL_PRODUCTION;

  if (!N8N_WEBHOOK_URL_PRODUCTION) {
    return { status: false, message: 'N8N webhook URL not configured' };
  }

  // Validasi jawaban dulu sebelum masuk queue
  const session = await prisma.testSession.findFirst({
    where: { pesertaId: Number(pesertaId) },
    orderBy: { createdAt: 'desc' }
  });

  if (!session) {
    return { status: false, message: 'Session tidak ditemukan' };
  }

  const jawabanCount = await prisma.jawabanCfit.count({
    where: { sessionId: session.id }
  });

  if (jawabanCount === 0) {
    return { status: false, message: 'Jawaban belum tersimpan' };
  }

  // Masukkan ke queue — tidak langsung fire
  addToN8NQueue(async () => {
    console.log(`🔔 [Queue] Triggering N8N peserta ${pesertaId} (${jawabanCount} jawaban)...`);

    const response = await fetch(N8N_WEBHOOK_URL_PRODUCTION, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            body: {
            pesertaId,
            tests,
            timestamp: new Date().toISOString(),
            event: 'test_completed'
            }
        }),
      signal: AbortSignal.timeout(15000) // timeout 15 detik
    });

    if (!response.ok) {
      throw new Error(`N8N responded with status ${response.status}`);
    }

    console.log(`✅ [Queue] N8N triggered peserta ${pesertaId}`);
  });

  return { status: true, message: 'N8N trigger queued' };
};
export const n8nCfitService = async (req:any, res:any, id: number) => {
    try {
        const pesertaId = id
        const n8n = await n8nCfitModel(pesertaId)
        console.log(n8n)
        if( n8n === null) {
            return ({
                status: false,
                message: 'data tidak ditemukan'
            })
        }

        let unit:string = n8n.unit
        let unitTrue = ''
        switch(unit) {
          case 'MPP':
            unitTrue = 'PT. Makassar Putra Prima'
            break
            
          case 'ACS':
            unitTrue = 'PT. Aptana Citra Solusindo'
            break
            
          case 'MMPP':
            unitTrue = 'PT. Makassar Megaputra Prima'
            break

          case 'IMP':
            unitTrue = 'PT. Indo Mega Prima'
            break
          
          case 'PPH':
            unitTrue = 'PT. Putra Prima Hotel'
            break
          
          case 'SMP':
            unitTrue = 'PT. Samamaju Prima'
            break
        }
        
        let jenisKelamin:string = n8n.jenisKelamin
        let gender = ''
        
        switch(jenisKelamin) {
          case 'LAKI_LAKI':
            gender = 'Laki-laki'
            break
          
          case 'PEREMPUAN':
            gender = 'Perempuan'
            break
        }

        const tglLahir = dateBornConverter(n8n.tanggalLahir)
        const tglTes = dateConverter(n8n.createdAt)

        const peserta:any = {
            "id": pesertaId,
            "nama": n8n.nama,
            "email": n8n.email,
            "tanggal lahir": tglLahir,
            "tanggal tes": tglTes,
            "usia": n8n.usia,
            "jenis kelamin": gender,
            "pendidikan terakhir": n8n.pendidikanTerakhir,
            "bisnis unit": unitTrue,
            "jurusan": n8n.jurusan,
            "posisi yang dilamar": n8n.posisi
        }

        n8n.testSession.forEach(session => {
            session.jawabanCfit.forEach(jawaban => {
                const key = `S${jawaban.subtest}_Q${jawaban.questionId}`
                peserta[`${key}`] = jawaban.answers.join(",")
            })
        })

        return ({
            status: true,
            message: 'berhasil mendapatkan data jawaban peserta',
            data: peserta
        })
    } catch (error) {
        return ({
            status: false,
            message: 'Gagal mendapatkan data jawaban cfit peserta'
        })
    }
}

export const n8nKraepelinService = async (req:any, res:any, id:number) => {
    try {
        const pesertaId = id
        const n8n = await n8nKraepelinModel(pesertaId)

        if(n8n === null) {
            return ({
                status: false,
                message: "data tidak ditemukan"
            })
        }

        let unit:string = n8n.unit
        let unitTrue = ''
        switch(unit) {
          case 'MPP':
            unitTrue = 'PT. Makassar Putra Prima'
            break
            
          case 'ACS':
            unitTrue = 'PT. Aptana Citra Solusindo'
            break
            
          case 'MMPP':
            unitTrue = 'PT. Makassar Megaputra Prima'
            break

          case 'IMP':
            unitTrue = 'PT. Indo Mega Prima'
            break
          
          case 'PPH':
            unitTrue = 'PT. Putra Prima Hotel'
            break
          
          case 'SMP':
            unitTrue = 'PT. Samamaju Prima'
            break
        }
        
        let jenisKelamin:string = n8n.jenisKelamin
        let gender = ''
        
        switch(jenisKelamin) {
          case 'LAKI_LAKI':
            gender = 'Laki-laki'
            break
          
          case 'PEREMPUAN':
            gender = 'Perempuan'
            break
        }

        const tglLahir = dateBornConverter(n8n.tanggalLahir)
        const tglTes = dateConverter(n8n.createdAt)

        const kraepelin:any = {
            "id": pesertaId,
            "nama": n8n.nama,
            "email": n8n.email,
            "tanggal lahir": tglLahir,
            "tanggal tes": tglTes,
            "usia": n8n.usia,
            "jenis kelamin": gender,
            "pendidikan terakhir": n8n.pendidikanTerakhir,
            "bisnis unit": unitTrue,
            "jurusan": n8n.jurusan,
            "posisi yang dilamar": n8n.posisi
        } 

        n8n.testSession.forEach(session => {
            session.jawabanKraepelin.forEach(jawaban => {
                // const key = `S${jawaban.subtest}_Q${jawaban.questionId}`
                const totalAnswered = `total_L${jawaban.columnIndex+1}`
                const correctAnswers = `benar_L${jawaban.columnIndex+1}`
                const wrongAnswers = `salah_L${jawaban.columnIndex+1}`
                const answers = `jawaban_L${jawaban.columnIndex+1}`

                kraepelin[`${totalAnswered}`] = jawaban.totalAnswered
                kraepelin[`${correctAnswers}`] = jawaban.correctAnswers
                kraepelin[`${wrongAnswers}`] = jawaban.wrongAnswers
                kraepelin[`${answers}`] = jawaban.answers.join(",")
            })
        })

        return ({
            status: true,
            message: "data berhasil diambil",
            data: kraepelin
        })
    } catch (error) {
        return ({
            status: false,
            message: 'Gagal mendapatkan data jawaban kraepelin peserta'
        })
    }
}

export const n8nDiscService = async (req:any, res:any, id:number) => {
    try {
        const pesertaId = id
        const n8n = await n8nDiscModel(pesertaId)

        if(n8n === null) {
            return ({
                status: false,
                message: "data tidak ditemukan"
            })
        }

        let unit:string = n8n.unit
        let unitTrue = ''
        switch(unit) {
          case 'MPP':
            unitTrue = 'PT. Makassar Putra Prima'
            break
            
          case 'ACS':
            unitTrue = 'PT. Aptana Citra Solusindo'
            break
            
          case 'MMPP':
            unitTrue = 'PT. Makassar Megaputra Prima'
            break

          case 'IMP':
            unitTrue = 'PT. Indo Mega Prima'
            break
          
          case 'PPH':
            unitTrue = 'PT. Putra Prima Hotel'
            break
          
          case 'SMP':
            unitTrue = 'PT. Samamaju Prima'
            break
        }
        
        let jenisKelamin:string = n8n.jenisKelamin
        let gender = ''
        
        switch(jenisKelamin) {
          case 'LAKI_LAKI':
            gender = 'Laki-laki'
            break
          
          case 'PEREMPUAN':
            gender = 'Perempuan'
            break
        }

        const tglLahir = dateBornConverter(n8n.tanggalLahir)
        const tglTes = dateConverter(n8n.createdAt)

        const disc:any = {
            "id": pesertaId,
            "nama": n8n.nama,
            "email": n8n.email,
            "tanggal lahir": tglLahir,
            "tanggal tes": tglTes,
            "usia": n8n.usia,
            "jenis kelamin": gender,
            "pendidikan terakhir": n8n.pendidikanTerakhir,
            "bisnis unit": unitTrue,
            "jurusan": n8n.jurusan,
            "posisi yang dilamar": n8n.posisi
        } 

        //most
        n8n.testSession.forEach(session => {
            session.jawabanDisc.forEach(jawaban => {
                for(let i = 1; i < 5; i++) {
                    const most = `most${jawaban.questionIndex}_option${i}` //most1_option1
                    if (i === jawaban.most) {
                        disc[`${most}`] = 1
                    } else {
                        disc[`${most}`] = 0
                    }
                    
                }
            })
        })

        //least
        n8n.testSession.forEach(session => {
            session.jawabanDisc.forEach(jawaban => {
                for(let i = 1; i < 5; i++) {
                    const least = `least${jawaban.questionIndex}_option${i}` //least1_option1
                    if (i === jawaban.least) {
                        disc[`${least}`] = 1
                    } else {
                        disc[`${least}`] = 0
                    }
                    
                }
            })
        })

        return ({
            status: true,
            message: "data berhasil diambil",
            data: disc
        })
    } catch (error) {
        return ({
            status: false,
            message: 'Gagal mendapatkan data jawaban disc peserta'
        })
    }
}

export const n8nPapikostikService = async(req:any, res:any, id:number) => {
    try {
        const pesertaId = id
        const n8n = await n8nPapikostikModal(pesertaId)

        if(n8n === null) {
            return ({
                status: false,
                message: "data tidak ditemukan"
            })
        }

        let unit:string = n8n.unit
        let unitTrue = ''
        switch(unit) {
          case 'MPP':
            unitTrue = 'PT. Makassar Putra Prima'
            break
            
          case 'ACS':
            unitTrue = 'PT. Aptana Citra Solusindo'
            break
            
          case 'MMPP':
            unitTrue = 'PT. Makassar Megaputra Prima'
            break

          case 'IMP':
            unitTrue = 'PT. Indo Mega Prima'
            break
          
          case 'PPH':
            unitTrue = 'PT. Putra Prima Hotel'
            break
          
          case 'SMP':
            unitTrue = 'PT. Samamaju Prima'
            break
        }
        
        let jenisKelamin:string = n8n.jenisKelamin
        let gender = ''
        
        switch(jenisKelamin) {
          case 'LAKI_LAKI':
            gender = 'Laki-laki'
            break
          
          case 'PEREMPUAN':
            gender = 'Perempuan'
            break
        }

        const tglLahir = dateBornConverter(n8n.tanggalLahir)
        const tglTes = dateConverter(n8n.createdAt)

        const papikostik:any = {
            "id": pesertaId,
            "nama": n8n.nama,
            "email": n8n.email,
            "tanggal lahir": tglLahir,
            "tanggal tes": tglTes,
            "usia": n8n.usia,
            "jenis kelamin": gender,
            "pendidikan terakhir": n8n.pendidikanTerakhir,
            "bisnis unit": unitTrue,
            "jurusan": n8n.jurusan,
            "posisi yang dilamar": n8n.posisi
        } 

        n8n.testSession.forEach(session => {
            session.jawabanPapikostik.forEach(jawaban => {
                papikostik[`jawaban`] = jawaban.type
                for(let i = 1; i<3; i++) {
                    const a = `${jawaban.questionIndex}A`
                        if(jawaban.type === 1) {
                            papikostik[`${a}`] = 1 
                        } else {
                            papikostik[`${a}`] = 0
                        }
                }
            })
        })

        n8n.testSession.forEach(session => {
            session.jawabanPapikostik.forEach(jawaban => {
                for(let i = 1; i<3; i++) {
                    const b = `${jawaban.questionIndex}B`
                        if(jawaban.type === 2) {
                            papikostik[`${b}`] = 1 
                        } else {
                            papikostik[`${b}`] = 0
                        }
                }
            })
        })

        return ({
            status: true,
            message: "data berhasil diambil",
            data: papikostik
        })
    } catch (error) {
        return ({
            status: false,
            message: 'Gagal mendapatkan data jawaban disc peserta'
        })
    }

}

export const n8nMsdtService = async(req:any, res:any, id:number) => {
    try {
        const pesertaId = id
        const n8n = await n8nMsdtModel(pesertaId)

        if(n8n === null) {
            return ({
                status: false,
                message: "data tidak ditemukan"
            })
        }

        let unit:string = n8n.unit
        let unitTrue = ''
        switch(unit) {
          case 'MPP':
            unitTrue = 'PT. Makassar Putra Prima'
            break
            
          case 'ACS':
            unitTrue = 'PT. Aptana Citra Solusindo'
            break
            
          case 'MMPP':
            unitTrue = 'PT. Makassar Megaputra Prima'
            break

          case 'IMP':
            unitTrue = 'PT. Indo Mega Prima'
            break
          
          case 'PPH':
            unitTrue = 'PT. Putra Prima Hotel'
            break
          
          case 'SMP':
            unitTrue = 'PT. Samamaju Prima'
            break
        }
        
        let jenisKelamin:string = n8n.jenisKelamin
        let gender = ''
        
        switch(jenisKelamin) {
          case 'LAKI_LAKI':
            gender = 'Laki-laki'
            break
          
          case 'PEREMPUAN':
            gender = 'Perempuan'
            break
        }

        const tglLahir = dateBornConverter(n8n.tanggalLahir)
        const tglTes = dateConverter(n8n.createdAt)

        const msdt:any = {
            "id": pesertaId,
            "nama": n8n.nama,
            "email": n8n.email,
            "tanggal lahir": tglLahir,
            "tanggal tes": tglTes,
            "usia": n8n.usia,
            "jenis kelamin": gender,
            "pendidikan terakhir": n8n.pendidikanTerakhir,
            "bisnis unit": unitTrue,
            "jurusan": n8n.jurusan,
            "posisi yang dilamar": n8n.posisi
        } 

        n8n.testSession.forEach(session => {
            session.jawabanMsdt.forEach(jawaban => {
                for(let i = 1; i<3; i++) {
                    const a = `${jawaban.questionIndex}A`
                        if(jawaban.type === 1) {
                            msdt[`${a}`] = 1 
                        } else {
                            msdt[`${a}`] = 0
                        }
                }
            })
        })

        n8n.testSession.forEach(session => {
            session.jawabanMsdt.forEach(jawaban => {
                for(let i = 1; i<3; i++) {
                    const b = `${jawaban.questionIndex}B`
                        if(jawaban.type === 2) {
                            msdt[`${b}`] = 1 
                        } else {
                            msdt[`${b}`] = 0
                        }
                }
            })
        })

        return ({
            status: true,
            message: "data berhasil diambil",
            data: msdt
        })
    } catch (error) {
        return ({
            status: false,
            message: 'Gagal mendapatkan data jawaban disc peserta'
        })
    }
}

export const n8nMbtiService = async (req:any, res:any, id: number) => {
    try {
        const pesertaId = id
        const n8n = await n8nMbtiModel(pesertaId)

        if(n8n === null) {
            return ({
                status: false,
                message: "data tidak ditemukan"
            })
        }

        let unit:string = n8n.unit
        let unitTrue = ''
        switch(unit) {
          case 'MPP':
            unitTrue = 'PT. Makassar Putra Prima'
            break
            
          case 'ACS':
            unitTrue = 'PT. Aptana Citra Solusindo'
            break
            
          case 'MMPP':
            unitTrue = 'PT. Makassar Megaputra Prima'
            break

          case 'IMP':
            unitTrue = 'PT. Indo Mega Prima'
            break
          
          case 'PPH':
            unitTrue = 'PT. Putra Prima Hotel'
            break
          
          case 'SMP':
            unitTrue = 'PT. Samamaju Prima'
            break
        }
        
        let jenisKelamin:string = n8n.jenisKelamin
        let gender = ''
        
        switch(jenisKelamin) {
          case 'LAKI_LAKI':
            gender = 'Laki-laki'
            break
          
          case 'PEREMPUAN':
            gender = 'Perempuan'
            break
        }

        const tglLahir = dateBornConverter(n8n.tanggalLahir)
        const tglTes = dateConverter(n8n.createdAt)

        const mbti:any = {
            "id": pesertaId,
            "nama": n8n.nama,
            "email": n8n.email,
            "tanggal lahir": tglLahir,
            "tanggal tes": tglTes,
            "usia": n8n.usia,
            "jenis kelamin": gender,
            "pendidikan terakhir": n8n.pendidikanTerakhir,
            "bisnis unit": unitTrue,
            "jurusan": n8n.jurusan,
            "posisi yang dilamar": n8n.posisi
        } 

        n8n.testSession.forEach(session => {
            session.jawabanMbti.forEach(jawaban => {
                for(let i = 1; i<3; i++) {
                    const a = `${jawaban.questionIndex}A`
                        if(jawaban.type === 1) {
                            mbti[`${a}`] = 1 
                        } else {
                            mbti[`${a}`] = 0
                        }
                }
            })
        })

        n8n.testSession.forEach(session => {
            session.jawabanMbti.forEach(jawaban => {
                for(let i = 1; i<3; i++) {
                    const b = `${jawaban.questionIndex}B`
                        if(jawaban.type === 2) {
                            mbti[`${b}`] = 1 
                        } else {
                            mbti[`${b}`] = 0
                        }
                }
            })
        })

        return ({
            status: true,
            message: "data jawaban mbti berhasil diambil",
            data: mbti
        })
    } catch (error) {
        return ({
            status: false,
            message: 'Gagal mendapatkan data jawaban mbti peserta'
        })
    }
}

export const getAllCfitAnswersService = async (date: string) => {
    try{
        
        const answers = await getAllCfitAnswersModel(date)

        

        if (!answers) {
            return ({
                status: true,
                message: 'Data kosong'
            })
        }

        const result = answers.map((item) => {
            const p = item.peserta
            const unitTrue = unitMap[p.unit] ?? p.unit

            const tglLahir = dateBornConverter(p.tanggalLahir)
            const tglTes = dateConverter(p.createdAt)
            const gender = p.jenisKelamin

            const peserta: any = {
                id: item.pesertaId,
                nama: p.nama,
                email: p.email,
                'tanggal lahir': tglLahir,
                'tanggal tes': tglTes,
                usia: p.usia,
                'jenis kelamin': gender,
                'pendidikan terakhir': p.pendidikanTerakhir,
                'bisnis unit': unitTrue,
                jurusan: p.jurusan,
                'posisi yang dilamar': p.posisi,
            }

            p.testSession.forEach((session) => {
                session.jawabanCfit.forEach((jawaban) => {
                const key = `S${jawaban.subtest}_Q${jawaban.questionId}`
                peserta[key] = jawaban.answers.join(',')
                })
            })

            return peserta
        })

        return ({
            status: true,
            message: 'Data berhasil diambil',
            data: result
        })
    } catch (error) {
        return({
            status: false,
            message: `Proses gagal: ${error}`
        })
    }
}

export const getAllKraepelinAnswersService = async (date:string) => {
    try{
        const answers = await getAllKraepelinAnswersModel(date)
        if (!answers) {
            return ({
                status: true,
                message: 'Data kosong'
            })
        }

        const result = answers.map((item) => {
            const p = item.peserta
            const unitTrue = unitMap[p.unit] ?? p.unit

            const tglLahir = dateBornConverter(p.tanggalLahir)
            const tglTes = dateConverter(p.createdAt)
            const gender = p.jenisKelamin

            const peserta: any = {
                id: item.pesertaId,
                nama: p.nama,
                email: p.email,
                'tanggal lahir': tglLahir,
                'tanggal tes': tglTes,
                usia: p.usia,
                'jenis kelamin': gender,
                'pendidikan terakhir': p.pendidikanTerakhir,
                'bisnis unit': unitTrue,
                jurusan: p.jurusan,
                'posisi yang dilamar': p.posisi,
            }

            p.testSession.forEach(session => {
                session.jawabanKraepelin.forEach(jawaban => {
                    // const key = `S${jawaban.subtest}_Q${jawaban.questionId}`
                    const totalAnswered = `total_L${jawaban.columnIndex+1}`
                    const correctAnswers = `benar_L${jawaban.columnIndex+1}`
                    const wrongAnswers = `salah_L${jawaban.columnIndex+1}`
                    const answers = `jawaban_L${jawaban.columnIndex+1}`

                    peserta[`${totalAnswered}`] = jawaban.totalAnswered
                    peserta[`${correctAnswers}`] = jawaban.correctAnswers
                    peserta[`${wrongAnswers}`] = jawaban.wrongAnswers
                    peserta[`${answers}`] = jawaban.answers.join(",")
                })
            })

            return peserta
        })

        return ({
            status: true,
            message: 'Data berhasil diambil',
            data: result
        })
    } catch (error) {
        return({
            status: false,
            message: `Proses gagal: ${error}`
        })
    }
}

export const getAllDiscAnswersService = async (date:string) => {
    try{
        const answers = await getAllDiscAnswersModel(date)
        if (!answers) {
            return ({
                status: true,
                message: 'Data kosong'
            })
        }

        const result = answers.map((item) => {
            const p = item.peserta
            const unitTrue = unitMap[p.unit] ?? p.unit

            const tglLahir = dateBornConverter(p.tanggalLahir)
            const tglTes = dateConverter(p.createdAt)
            const gender = p.jenisKelamin

            const peserta: any = {
                id: item.pesertaId,
                nama: p.nama,
                email: p.email,
                'tanggal lahir': tglLahir,
                'tanggal tes': tglTes,
                usia: p.usia,
                'jenis kelamin': gender,
                'pendidikan terakhir': p.pendidikanTerakhir,
                'bisnis unit': unitTrue,
                jurusan: p.jurusan,
                'posisi yang dilamar': p.posisi,
            }

            //most
            p.testSession.forEach(session => {
                session.jawabanDisc.forEach(jawaban => {
                    for(let i = 1; i < 5; i++) {
                        const most = `most${jawaban.questionIndex}_option${i}` //most1_option1
                        if (i === jawaban.most) {
                            peserta[`${most}`] = 1
                        } else {
                            peserta[`${most}`] = 0
                        }
                        
                    }
                })
            })

            //least
            p.testSession.forEach(session => {
                session.jawabanDisc.forEach(jawaban => {
                    for(let i = 1; i < 5; i++) {
                        const least = `least${jawaban.questionIndex}_option${i}` //least1_option1
                        if (i === jawaban.least) {
                            peserta[`${least}`] = 1
                        } else {
                            peserta[`${least}`] = 0
                        }
                        
                    }
                })
            })

            return peserta
        })

        return ({
            status: true,
            message: 'Data berhasil diambil',
            data: result
        })
    } catch (error) {
        return({
            status: false,
            message: `Proses gagal: ${error}`
        })
    }
}

export const getAllPapikostickAnswersService = async (date:string) => {
    try{
        const answers = await getAllPapikostickAnswersModel(date)
        if (!answers) {
            return ({
                status: true,
                message: 'Data kosong'
            })
        }

        const result = answers.map((item) => {
            const p = item.peserta
            const unitTrue = unitMap[p.unit] ?? p.unit

            const tglLahir = dateBornConverter(p.tanggalLahir)
            const tglTes = dateConverter(p.createdAt)
            const gender = p.jenisKelamin

            const peserta: any = {
                id: item.pesertaId,
                nama: p.nama,
                email: p.email,
                'tanggal lahir': tglLahir,
                'tanggal tes': tglTes,
                usia: p.usia,
                'jenis kelamin': gender,
                'pendidikan terakhir': p.pendidikanTerakhir,
                'bisnis unit': unitTrue,
                jurusan: p.jurusan,
                'posisi yang dilamar': p.posisi,
            }

            p.testSession.forEach(session => {
                session.jawabanPapikostik.forEach(jawaban => {
                    peserta[`jawaban`] = jawaban.type
                    for(let i = 1; i<3; i++) {
                        const a = `${jawaban.questionIndex}A`
                            if(jawaban.type === 1) {
                                peserta[`${a}`] = 1 
                            } else {
                                peserta[`${a}`] = 0
                            }
                    }
                })
            })

        return peserta
        })

        return ({
            status: true,
            message: 'Data berhasil diambil',
            data: result
        })
    } catch (error) {
        return({
            status: false,
            message: `Proses gagal: ${error}`
        })
    }
}

export const getAllMsdtAnswersService = async (date:string) => {
    try{
        const answers = await getAllMsdtAnswersModel(date)
        if (!answers) {
            return ({
                status: true,
                message: 'Data kosong'
            })
        }

        const result = answers.map((item) => {
            const p = item.peserta
            const unitTrue = unitMap[p.unit] ?? p.unit

            const tglLahir = dateBornConverter(p.tanggalLahir)
            const tglTes = dateConverter(p.createdAt)
            const gender = p.jenisKelamin

            const peserta: any = {
                id: item.pesertaId,
                nama: p.nama,
                email: p.email,
                'tanggal lahir': tglLahir,
                'tanggal tes': tglTes,
                usia: p.usia,
                'jenis kelamin': gender,
                'pendidikan terakhir': p.pendidikanTerakhir,
                'bisnis unit': unitTrue,
                jurusan: p.jurusan,
                'posisi yang dilamar': p.posisi,
            }

            p.testSession.forEach(session => {
                session.jawabanMsdt.forEach(jawaban => {
                    for(let i = 1; i<3; i++) {
                        const a = `${jawaban.questionIndex}A`
                            if(jawaban.type === 1) {
                                peserta[`${a}`] = 1 
                            } else {
                                peserta[`${a}`] = 0
                            }
                    }
                })
            })

            p.testSession.forEach(session => {
                session.jawabanMsdt.forEach(jawaban => {
                    for(let i = 1; i<3; i++) {
                        const b = `${jawaban.questionIndex}B`
                            if(jawaban.type === 2) {
                                peserta[`${b}`] = 1 
                            } else {
                                peserta[`${b}`] = 0
                            }
                    }
                })
            })

        return peserta
        })

        return ({
            status: true,
            message: 'Data berhasil diambil',
            data: result
        })
    } catch (error) {
        return({
            status: false,
            message: `Proses gagal: ${error}`
        })
    }
}

export const getAllMbtiAnswersService = async (date:string) => {
    try{
        const answers = await getAllMbtiAnswersModel(date)
        if (!answers) {
            return ({
                status: true,
                message: 'Data kosong'
            })
        }

        const result = answers.map((item) => {
            const p = item.peserta
            const unitTrue = unitMap[p.unit] ?? p.unit

            const tglLahir = dateBornConverter(p.tanggalLahir)
            const tglTes = dateConverter(p.createdAt)
            const gender = p.jenisKelamin

            const peserta: any = {
                id: item.pesertaId,
                nama: p.nama,
                email: p.email,
                'tanggal lahir': tglLahir,
                'tanggal tes': tglTes,
                usia: p.usia,
                'jenis kelamin': gender,
                'pendidikan terakhir': p.pendidikanTerakhir,
                'bisnis unit': unitTrue,
                jurusan: p.jurusan,
                'posisi yang dilamar': p.posisi,
            }

            p.testSession.forEach(session => {
                session.jawabanMbti.forEach(jawaban => {
                    for(let i = 1; i<3; i++) {
                        const a = `${jawaban.questionIndex}A`
                            if(jawaban.type === 1) {
                                peserta[`${a}`] = 1 
                            } else {
                                peserta[`${a}`] = 0
                            }
                    }
                })
            })

        return peserta
        })

        return ({
            status: true,
            message: 'Data berhasil diambil',
            data: result
        })
    } catch (error) {
        return({
            status: false,
            message: `Proses gagal: ${error}`
        })
    }
}

export const postPapikostickScoringService = async (score: any) => {
    try{
        const scoring = await postPapikostickScoringModel(score)

        if (!scoring) {
            return ({
                status: true,
                message: "gagal post scoring papikostick",
                data: scoring
            })
        }

        return ({
            status: true,
            message: "berhasil post scoring papikostick",
            data: scoring
        })
        
    } catch (error) {
        return({
            status: false,
            message: `proses gagal: ${error}`
        })
    }
}

export const postDiscScoringService = async (score:any) => {
    try {
        const scoring = await postDiscScoringModel(score)
        if (!scoring) {
            return ({
                status: true,
                message: "gagal post scoring disc",
                data: scoring
            })
        }

        return ({
            status: true,
            message: "berhasil post scoring disc",
            data: scoring
        })
    } catch (error) {
        return({
            status: false,
            message: `proses gagal: ${error}`
        })
    }
}