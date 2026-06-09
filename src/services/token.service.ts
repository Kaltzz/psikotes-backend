import { Role } from "@prisma/client";
import {
  tokenNonactiveModel,
  fetchTokenModel,
  postTokenModel,
  fetchTokenModelAdmin,
  allDataTokenAdminModel,
  allDataTokenModel,
  getAllTokenStatusAdminModel,
  getAllTokenStatusModel,
  refreshTokenModel,
} from "../models/token.model";
import { count } from "node:console";

export const getTokenService = async (
  role: string,
  page: number,
  limit: number,
  offset: any,
  status: string,
  startDate?: string,
  endDate?: string,
) => {
  try {
    let dataToken, allData, newStatus;

    if (status === "Tidak Aktif") {
      newStatus = false;
    } else if (status === "Aktif") {
      newStatus = true;
    } else {
      newStatus = undefined;
    }
    if (role === Role.ADMIN) {
      dataToken = await fetchTokenModelAdmin(
        page,
        limit,
        offset,
        newStatus,
        startDate,
        endDate,
      );
      allData = await allDataTokenAdminModel(newStatus, startDate, endDate);
    } else {
      dataToken = await fetchTokenModel(
        role,
        page,
        limit,
        offset,
        newStatus,
        startDate,
        endDate,
      );
      allData = await allDataTokenModel(role, newStatus, startDate, endDate);
    }
    let totalPages = Math.ceil(allData / limit);

    if (!dataToken) {
      return {
        status: false,
        message: "gagal mendapatkan data",
      };
    }

    if (dataToken.length === 0) {
      return {
        status: true,
        message: "Data kosong",
      };
    }

    return {
      status: true,
      message: "berhasil mendapatkan token",
      data: dataToken,
      pagination: {
        allData: allData,
        totalPages: totalPages,
      },
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.message,
    };
  }
};

export const addTokenService = async (
  postToken: any,
  res: any,
  role: string,
) => {
  try {
    const newDataToken = {
      tests: postToken.tests,
      kuota: postToken.kuota,
      role: role,
      activeDate: new Date(postToken.activeDate),
      expiredDate: new Date(postToken.expiredDate),
    };
    const dataToken = await postTokenModel(newDataToken, res);
    return {
      status: true,
      message: "berhasil menambahkan token",
      data: dataToken,
    };
  } catch (error) {
    return {
      status: false,
      message: "gagal menambahkan token",
    };
  }
};

export const nonactiveTokenService = async (
  id: any,
  res: any,
  statusActive: boolean,
) => {
  try {
    const deleteMessage = await tokenNonactiveModel(id, res, statusActive);
    return {
      status: true,
      message: "token berhasi dinonaktifkan",
      data: deleteMessage,
    };
  } catch (error) {
    return {
      status: false,
      message: "token gagal dinonaktifkan",
    };
  }
};

export const getAllTokenStatusService = async (
  role: string,
  startDate?: string,
  endDate?: string,
) => {
  // const allStatus = await getAllTokenStatusAdminModel(startDate, endDate);
  // console.log("ini status", allStatus);
  try {
    let allStatus;
    if (role == Role.ADMIN) {
      allStatus = await getAllTokenStatusAdminModel(startDate, endDate);
    } else {
      allStatus = await getAllTokenStatusModel(role, startDate, endDate);
    }

    const newStatus = allStatus.map((item) => {
      return {
        label: item.isActive ? "Aktif" : "Tidak Aktif",
        count: item._count.isActive,
      };
    });

    const total = newStatus.reduce((akumulasi, item) => {
      return akumulasi + item.count;
    }, 0);

    newStatus.unshift({ label: "Semua", count: total });

    return {
      status: true,
      message: "data status berhasil diperoleh",
      data: newStatus,
    };
  } catch (error: any) {
    return {
      status: false,
      message: "data status gagal diperoleh",
    };
  }
};

export const refreshTokenService = async () => {
  try {
    const token = await refreshTokenModel();

    return {
      status: true,
      message: "Refresh token berhasil",
      data: token,
    };
  } catch (error: any) {
    return {
      status: false,
      message: "Refresh token gagal",
    };
  }
};
