import { Role } from "@prisma/client";
import {
  postPesertaModel,
  getAllPesertaModel,
  getDetailPesertaModel,
  statusPesertaModel,
  hasilPesertaModel,
  hasilTesModel,
  userExpiredModel,
  setTrueModel,
  newTestSessionModel,
  hasilPesertaModelAdmin,
  getAllPesertaModelAdmin,
  allDataAdminModel,
  allDataModel,
  getAllPosisiAdminModel,
  getAllPosisiModel,
  allDataHasilModelAdmin,
  allDataHasilModel,
  getAllHasilPosisiAdminModel,
  getAllHasilPosisiModel,
  getCountAllPesertaModel,
} from "../models/peserta.model";
import {
  addCount,
  getSpecificToken,
  updateTokenModel,
} from "../models/token.model";
import { scoringCfit } from "../utils/scoring.utils";

const dateConverter = (date: any) => {
  const dateParser = new Date(date);
  const witaFormatter = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Makassar",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const time = witaFormatter.format(dateParser).split(", ");
  const dateTest = time[0] + ":" + time[1] + " WITA";

  return dateTest;
};

export const userExpiredService = async (nik: string) => {
  try {
    const peserta = await userExpiredModel(nik);

    // 1. Peserta tidak ditemukan
    if (!peserta) {
      return {
        status: true,
        message: "Data tidak ditemukan",
        statusCode: 0,
      };
    }

    // 2. Status expired tidak ditemukan
    const latestStatus = peserta.statusExpired[0];
    if (!latestStatus?.expiredAt) {
      return {
        status: true,
        message: "Status expired tidak ditemukan",
        statusCode: 1,
      };
    }

    const now = new Date();
    const expiredDate = new Date(latestStatus.expiredAt);

    // 3. Sudah expired → set true, boleh tes ulang
    if (now >= expiredDate) {
      await setTrueModel(latestStatus.id); // ✅ cukup id StatusExpired
      return {
        status: true,
        message: "Peserta expired, silakan tes ulang",
        data: peserta,
        statusCode: 2,
      };
    }

    // 4. Belum expired
    return {
      status: true,
      message: "Peserta belum expired",
      data: peserta,
      statusCode: 3,
    };
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
};

export const postPesertaService = async (post: any, res: any) => {
  const postToken = post.tokenPeserta;
  const token = await getSpecificToken(postToken);

  const dateNow = new Date();

  if (token === null || token == undefined || !token) {
    return {
      status: false,
      message: "Token tidak sesuai",
    };
  } else {
    if (token.isActive === false) {
      return {
        status: false,
        message: "Token tidak aktif",
      };
    } else {
      if (dateNow < token.activeDate || dateNow > token.expiredDate) {
        const updateToken = await updateTokenModel(token.id);
        return {
          status: false,
          message: "Token Kadaluwarsa",
        };
      }
    }

    if (token.usedCount < token.kuota) {
      const nikCheck = await userExpiredService(post.nik);
      if (nikCheck.statusCode === 0) {
        const postResult = await postPesertaModel(post, res, token.id);
        const usedCount = await addCount(token.id);

        const sessionId = postResult.testSession?.[0]?.id;

        if (!sessionId) {
          return {
            status: false,
            message: "Gagal memuat sesi ujian",
          };
        }
        return {
          status: true,
          message: "Token yang dimasukkan benar",
          // data: [postResult, token.tests]
          data: {
            pesertaId: postResult.id,
            sessionId: sessionId,
            tests: postResult.token.tests,
          },
          statusCode: 0,
        };
      } else if (nikCheck.statusCode === 2) {
        const pesertaId = nikCheck.data?.statusExpired[0]?.pesertaId;

        if (!pesertaId) {
          return {
            status: false,
            message: "peserta id tidak ditemukan saat pengecekan NIK",
          };
        }
        const newTestSession = await newTestSessionModel(pesertaId, postToken);
        const usedCount = await addCount(token.id);
        return {
          status: true,
          message: "test session baru ditambahkan",
          statusCode: 2,
          data: {
            pesertaId: newTestSession.pesertaId,
            sessionId: newTestSession.id,
            tests: newTestSession.peserta.token.tests,
          },
        };
      } else if (nikCheck.statusCode === 3) {
        return {
          status: true,
          message: "hasil tes peserta belum expired",
          statusCode: 3,
        };
      } else {
        return {
          status: false,
          message: "nik ditemukan tapi statusExpired tidak ditemukan",
          statusCode: nikCheck.statusCode,
        };
      }
    } else {
      return {
        status: false,
        message: "Kuota telah melebihi batas",
      };
    }
  }
};

export const getCountAllPesertaService = async () => {
  try {
    const peserta = await getCountAllPesertaModel();

    return {
      status: true,
      message: "berhasil mendapatkan data",
      data: peserta,
    };
  } catch (error) {
    return {
      status: false,
      message: "gagal mendapatkan data",
    };
  }
};

export const getAllPesertaService = async (
  role: string,
  page: number,
  limit: number,
  offset: any,
  posisi?: string,
  nama?: string,
  startDate?: string,
  endDate?: string,
) => {
  try {
    let peserta, allData;

    if (role === Role.ADMIN) {
      peserta = await getAllPesertaModelAdmin(
        page,
        limit,
        offset,
        posisi,
        nama,
        startDate,
        endDate,
      );
      allData = await allDataAdminModel(posisi, nama, startDate, endDate);
    } else {
      peserta = await getAllPesertaModel(
        role,
        page,
        limit,
        offset,
        posisi,
        nama,
        startDate,
        endDate,
      );
      allData = await allDataModel(role, posisi, nama, startDate, endDate);
    }

    let totalPages = Math.ceil(allData / limit);

    if (!peserta) {
      return {
        status: false,
        message: "gagal mendapatkan data",
      };
    }

    if (peserta.length === 0) {
      return {
        status: true,
        message: "Data kosong",
      };
    }

    // formatter dibuat sekali
    const witaFormatter = new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Makassar",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    // mapping semua peserta
    const newPeserta = peserta.map((obj) => {
      const time = witaFormatter.format(new Date(obj.createdAt)).split(", ");

      const dateTest = `${time[0]}:${time[1]} WITA`;

      return {
        ...obj,
        tanggal: dateTest,
      };
    });

    return {
      status: true,
      data: newPeserta,
      pagination: {
        allData: allData,
        totalPages: totalPages,
      },
    };
  } catch (err: any) {
    return {
      status: false,
      message: err.message,
    };
  }
};

export const getDetailPesertaService = async (id: number, res: any) => {
  try {
    const peserta = await getDetailPesertaModel(id, res);
    return {
      status: true,
      message: "data ditemukan",
      data: peserta,
    };
  } catch (error) {
    return {
      status: false,
      message: "data tidak ditemukan",
    };
  }
};

export const getAllPosisiService = async (
  role: string,
  nama?: string,
  startDate?: string,
  endDate?: string,
) => {
  try {
    let allPosisi;

    if (role == Role.ADMIN) {
      allPosisi = await getAllPosisiAdminModel(nama, startDate, endDate);
    } else {
      allPosisi = await getAllPosisiModel(role, nama, startDate, endDate);
    }

    const newPosisi = allPosisi.map((item) => {
      return {
        label: item.posisi,
        count: item._count.posisi,
      };
    });

    const total = newPosisi.reduce((akumulasi, item) => {
      return akumulasi + item.count;
    }, 0);

    newPosisi.unshift({ label: "Semua", count: total });

    return {
      status: true,
      message: "data posisi berhasil diperoleh",
      data: newPosisi,
    };
  } catch (error) {
    return {
      status: true,
      message: `data posisi gagal diperoleh: ${error}`,
    };
  }
};

export const getAllHasilPosisiService = async (
  role: string,
  nama?: string,
  startDate?: string,
  endDate?: string,
) => {
  try {
    let allPosisi;

    if (role == Role.ADMIN) {
      allPosisi = await getAllHasilPosisiAdminModel(nama, startDate, endDate);
    } else {
      allPosisi = await getAllHasilPosisiModel(role, nama, startDate, endDate);
    }

    const newPosisi = allPosisi.map((item) => {
      return {
        label: item.posisi,
        count: item._count.posisi,
      };
    });

    const total = newPosisi.reduce((akumulasi, item) => {
      return akumulasi + item.count;
    }, 0);

    newPosisi.unshift({ label: "Semua", count: total });

    return {
      status: true,
      message: "data posisi berhasil diperoleh",
      data: newPosisi,
    };
  } catch (error) {
    return {
      status: true,
      message: `data posisi gagal diperoleh: ${error}`,
    };
  }
};

export const statusPesertaService = async (sessionId: number, res: any) => {
  try {
    const peserta = await statusPesertaModel(sessionId, res);
    return {
      status: true,
      message: "status tes peserta berhasil diubah",
      data: peserta,
    };
  } catch (error) {
    return {
      status: true,
      message: "status tes peserta gagal diubah",
    };
  }
};

// Hasil Tes
export const hasilPesertaService = async (
  role: string,
  page: number,
  limit: number,
  offset: any,
  posisi?: string,
  nama?: string,
  startDate?: string,
  endDate?: string,
) => {
  try {
    let peserta, allData;
    if (role === Role.ADMIN) {
      peserta = await hasilPesertaModelAdmin(
        page,
        limit,
        offset,
        posisi,
        nama,
        startDate,
        endDate,
      );
      allData = await allDataHasilModelAdmin(posisi, nama, startDate, endDate);
    } else {
      peserta = await hasilPesertaModel(
        role,
        page,
        limit,
        offset,
        posisi,
        nama,
        startDate,
        endDate,
      );
      allData = await allDataHasilModel(role, posisi, nama, startDate, endDate);
    }

    let totalPages = Math.ceil(allData / limit);

    if (!peserta) {
      return {
        status: false,
        message: "gagal mendapatkan data",
      };
    }

    if (peserta.length === 0) {
      return {
        status: true,
        message: "Data kosong",
      };
    }

    // formatter dibuat sekali
    const witaFormatter = new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Makassar",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    // // mapping semua peserta
    // const newPeserta = peserta.map(obj => {

    //     const time = witaFormatter
    //         .format(new Date(obj.peserta.createdAt))
    //         .split(", ")

    //     const dateTest =
    //         `${time[0]}:${time[1]} WITA`

    //     return {
    //         id: obj.peserta.id,
    //         nama: obj.peserta.nama,
    //         createdAt: obj.peserta.createdAt,
    //         posisi: obj.peserta.posisi,
    //         tanggal: dateTest
    //     }
    // })

    const pesertaNew = peserta.map((obj) => {
      return {
        pesertaId: obj.pesertaId,
        id: obj.peserta.id,
        createdAt: obj.peserta.createdAt,
        nama: obj.peserta.nama,
        posisi: obj.peserta.posisi,
      };
    });

    // mapping semua peserta
    const newPeserta = pesertaNew.map((obj) => {
      const time = witaFormatter.format(new Date(obj.createdAt)).split(", ");

      const dateTest = `${time[0]}:${time[1]} WITA`;

      return {
        ...obj,
        tanggal: dateTest,
      };
    });

    return {
      status: true,
      data: newPeserta,
      pagination: {
        allData: allData,
        totalPages: totalPages,
      },
    };
  } catch (err: any) {
    return {
      status: false,
      message: err.message,
    };
  }
};

export const hasilTesService = async (id: number) => {
  try {
    const peserta = await hasilTesModel(id);

    if (peserta === null) {
      return {
        status: false,
        message: "data tidak ditemukan",
      };
    }

    const jawabanCfit = peserta.testSession.flatMap((s) => s.jawabanCfit ?? []);
    const skorCfit = jawabanCfit.length > 0 ? scoringCfit(jawabanCfit) : [];

    let unit: string = peserta.unit;
    let unitTrue = "";
    switch (unit) {
      case "MPP":
        unitTrue = "PT. Makassar Putra Prima";
        break;

      case "ACS":
        unitTrue = "PT. Aptana Citra Solusindo";
        break;

      case "MMPP":
        unitTrue = "PT. Makassar Megaputra Prima";
        break;

      case "IMP":
        unitTrue = "PT. Indo Mega Prima";
        break;

      case "PPH":
        unitTrue = "PT. Putra Prima Hotel";
        break;

      case "SMP":
        unitTrue = "PT. Samamaju Prima";
        break;
    }

    let jenisKelamin: string = peserta.jenisKelamin;
    let gender = "";

    switch (jenisKelamin) {
      case "LAKI_LAKI":
        gender = "Laki-laki";
        break;

      case "PEREMPUAN":
        gender = "Perempuan";
        break;
    }

    const tglLahir = dateConverter(peserta.tanggalLahir);
    const tglTes = dateConverter(peserta.createdAt);

    const newPeserta: any = {
      nama: peserta.nama,
      email: peserta.email,
      tanggalLahir: tglLahir,
      tanggalTes: tglTes,
      usia: peserta.usia,
      jenisKelamin: gender,
      pendidikanTerakhir: peserta.pendidikanTerakhir,
      bisnisUnit: unitTrue,
      jurusan: peserta.jurusan,
      posisiYangDilamar: peserta.posisi,
      tests: peserta.token.tests,
      skorCfit: skorCfit,
      skorDisc: peserta.discScoring,
      skorMsdt: peserta.msdtScoring,
      skorMbti: peserta.mbtiScoring,
      skorPapikostik: peserta.papikostickScoring,
      skorKraepelin: peserta.kraepelinScoring,
    };

    return {
      status: true,
      message: "berhasil mendapatkan data",
      data: newPeserta,
    };
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
};
