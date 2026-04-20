import { 
    postPesertaModel, 
    getAllPesertaModel , 
    getDetailPesertaModel, 
    statusPesertaModel,
    hasilPesertaModel,
    hasilTesModel
} from "../models/peserta.model"
import { 
    addCount, 
    getSpecificToken,
     
} from "../models/token.model"

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

export const postPesertaService = async (post:any, res:any) => {
    const postToken = post.tokenPeserta
    const token = await getSpecificToken(postToken)

    if (token === null|| token == undefined || !token ) {
        return {
            status: false,
            message: 'Token tidak sesuai'
        }
    } else {
        if (token.isActive === false) {
            return {
                status: false,
                message: 'Token tidak aktif'
            }
        }

        if (token.usedCount < token.kuota){
            const postResult = await postPesertaModel(post, res, token.id)
            const usedCount = await addCount(token.id)

            const sessionId = postResult.testSession?.[0]?.id

            if (!sessionId) {
                return{
                    status: false,
                    message: 'Gagal memuat sesi ujian'
                }
            }
            return {
                status: true,
                message: 'Token yang dimasukkan benar',
                // data: [postResult, token.tests]
                data: {
                    pesertaId: postResult.id,
                    sessionId: sessionId,
                    tests: postResult.token.tests
                }
            }
        } else {
            return {
                status: false,
                message: 'Kuota telah melebihi batas'
            }
        }
        

        
    }
}

export const getAllPesertaService = async () => {
    try {
        const peserta = await getAllPesertaModel()
        return ({
            status: true,
            message: 'data ditemukan',
            data: peserta
        })
    } catch (error) {
        return ({
            status: false,
            message: 'data tidak ditemukan'
        })
    }
}

export const getDetailPesertaService = async (id:number, res:any) => {
    try {
        const peserta = await getDetailPesertaModel(id, res)
        return ({
            status: true,
            message: 'data ditemukan',
            data: peserta
        })
    } catch(error) {
        return ({
            status: false,
            message: 'data tidak ditemukan'
        })
    }
    // if (peserta === null) {
    //     return ({
    //         status: false,
    //         message: 'Data tidak ditemukan'
    //     })
    // } else {
    //     return({
    //         status: false,
    //         message: 'Data ditemukan',
    //         data: peserta
    //     })
    // }
}

export const statusPesertaService = async (sessionId:number, res:any) => {    
    
    try {
        const peserta = await statusPesertaModel(sessionId, res)
        return ({
            status: true,
            message: 'status tes peserta berhasil diubah',
            data: peserta
        })
    } catch(error) {
        return({
            status: true,
            message: 'status tes peserta gagal diubah'
        })

    }
}

// Hasil Tes
export const hasilPesertaService = async () => {
    try {
        const peserta = await hasilPesertaModel()
        const date = peserta[0]?.peserta.createdAt
        console.log(date)

        if(date == undefined) {
            return {
                status: false,
                message: "gagal mendapatkan data"
            }
        }

        console.log(peserta)
        
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

        // const newPeserta = {
        //     id: peserta[0]?.peserta.id,
        //     name: peserta[0]?.peserta.nama,
        //     date : dateTest
        // }

        const newPeserta = peserta.map(obj =>  ({
            ...obj.peserta,
            tanggal: dateTest
        }))

        return ({
            status: true,
            message: "berhasil mendapatkan data",
            data: newPeserta
        })
    } catch (error) {
        return ({
            status: false,
            message: "gagal mendapatkan data"
        })
    } 
}

export const hasilTesService = async (id: number) => {
    try {
        const peserta = await hasilTesModel(id)

        if( peserta === null) {
            return ({
                status: false,
                message: 'data tidak ditemukan'
            })
        }

        let unit:string = peserta.unit
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
        
        let jenisKelamin:string = peserta.jenisKelamin
        let gender = ''
        
        switch(jenisKelamin) {
          case 'LAKI_LAKI':
            gender = 'Laki-laki'
            break
          
          case 'PEREMPUAN':
            gender = 'Perempuan'
            break
        }

        const tglLahir = dateConverter(peserta.tanggalLahir)
        const tglTes = dateConverter(peserta.createdAt)

        const newPeserta:any = {
            "nama": peserta.nama,
            "email": peserta.email,
            "tanggal lahir": tglLahir,
            "tanggal tes": tglTes,
            "usia": peserta.usia,
            "jenis kelamin": gender,
            "pendidikan terakhir": peserta.pendidikanTerakhir,
            "bisnis unit": unitTrue,
            "jurusan": peserta.jurusan,
            "posisi yang dilamar": peserta.posisi,
            "jawaban": peserta.testSession,
            "tests": peserta.token.tests
        }

        return({
            status: true,
            message: "berhasil mendapatkan data",
            data: newPeserta
        })
    } catch(error) {
        return({
            status: false,
            message: "Gagal mendapatkan data"
        })
    }
}