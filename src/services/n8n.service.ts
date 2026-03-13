import { 
    n8nCfitModel,
    n8nKraepelinModel,
    n8nDiscModel
} from "../models/n8n.model"

export const triggerN8NService = async (pesertaId: number, tests: string) => {
    const N8N_WEBHOOK_URL_PRODUCTION = process.env.N8N_WEBHOOK_URL_PRODUCTION;
    console.log('ini test trigger:', typeof(tests))

    if (!N8N_WEBHOOK_URL_PRODUCTION) {
        console.warn('⚠️ N8N_WEBHOOK_URL_PRODUCTION not configured');
        return {
            status: false,
            message: 'N8N webhook URL not configured'
        };
    }

    try {
        console.log(`🔔 Triggering N8N for peserta ${pesertaId}...`);

        const response = await fetch(N8N_WEBHOOK_URL_PRODUCTION, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pesertaId: pesertaId,
                tests: tests,
                timestamp: new Date().toISOString(),
                event: 'test_completed'
            })
        });

        console.log('isi body: ', response.body)

        if (!response.ok) {
            throw new Error(`N8N responded with status ${response.status}`);
        }

        console.log(`✅ N8N triggered successfully for peserta ${pesertaId}`);

        return {
            status: true,
            message: 'N8N triggered successfully',
            data: response.body
        };

    } catch (error) {
        console.error(`❌ Failed to trigger N8N for peserta ${pesertaId}:`, error);

        return {
            status: false,
            message: 'Failed to trigger N8N'
        };
    }
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

        const peserta:any = {
            "nama": n8n.nama,
            "email": n8n.email,
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

        const kraepelin:any = {
            "nama": n8n.nama,
            "email": n8n.email,
            "jenis kelamin": gender,
            "usia": n8n.usia,
            "pendidikan terakhir": n8n.pendidikanTerakhir,
            "jurusan": n8n.jurusan,
            "posisi yang dilamar": n8n.posisi,
            "bisnis unit": unitTrue
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

        const disc:any = {
            "nama": n8n.nama,
            "email": n8n.email,
            "jenis kelamin": gender,
            "usia": n8n.usia,
            "pendidikan terakhir": n8n.pendidikanTerakhir,
            "jurusan": n8n.jurusan,
            "posisi yang dilamar": n8n.posisi,
            "bisnis unit": unitTrue
        }

        n8n.testSession.forEach(session => {
            session.jawabanDisc.forEach(jawaban => {
                const most = `most${jawaban.questionIndex}`
                disc[`${most}`] = jawaban.most
                const least = `least${jawaban.questionIndex}`
                disc[`${least}`] = jawaban.least
            })
        })

        // n8n.testSession.forEach(session => {
        //     session.jawabanKraepelin.forEach(jawaban => {
        //         // const key = `S${jawaban.subtest}_Q${jawaban.questionId}`
        //         const totalAnswered = `total_L${jawaban.columnIndex+1}`
        //         const correctAnswers = `benar_L${jawaban.columnIndex+1}`
        //         const wrongAnswers = `salah_L${jawaban.columnIndex+1}`
        //         const answers = `jawaban_L${jawaban.columnIndex+1}`

        //         kraepelin[`${totalAnswered}`] = jawaban.totalAnswered
        //         kraepelin[`${correctAnswers}`] = jawaban.correctAnswers
        //         kraepelin[`${wrongAnswers}`] = jawaban.wrongAnswers
        //         kraepelin[`${answers}`] = jawaban.answers.join(",")
        //     })
        // })
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