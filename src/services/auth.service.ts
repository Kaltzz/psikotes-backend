import {
  getUsername,
  findRefreshToken,
  deleteRefreshToken,
  updateRefreshToken,
} from "../models/auth.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

export const loginService = async (dataLogin: any, res: any) => {
  const dataAdmin = await getUsername(dataLogin.username);

  if (!dataAdmin) {
    return { success: false, message: "Username/Password Salah" };
  }

  try {
    const match = await bcrypt.compare(dataLogin.password, dataAdmin.password);

    if (!match) {
      return { success: false, message: "Username/Password Salah" };
    }

    // Access token — 15 menit
    const payload = {
      id: dataAdmin.id,
      username: dataAdmin.username,
      role: dataAdmin.role,
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "15m", // sinkron dengan maxAge cookie
    });

    // Refresh token — 7 hari
    const refreshToken = randomBytes(64).toString("hex");
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        adminId: dataAdmin.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none" as const,
    };

    res.cookie("access_token", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000, // 15 menit
    });

    res.cookie("refresh_token", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
    });

    return {
      success: true,
      message: "Login Berhasil",
      data: {
        id: dataAdmin.id,
        username: dataAdmin.username,
      },
    };
  } catch (err) {
    return { success: false, message: "Login gagal" };
  }
};

export const refreshTokenService = async (token: any, req: any, res: any) => {
  if (!token) return { success: false, message: "No refresh token" };

  const stored = await findRefreshToken(token);

  if (!stored || stored.expiresAt < new Date()) {
    if (stored) await deleteRefreshToken(token);
    res.clearCookie("refresh_token");
    return { success: false, message: "Refresh token invalid atau expired" };
  }

  const admin = await prisma.admin.findUnique({
    where: { id: stored.adminId },
  });
  if (!admin) return { success: false, message: "Admin tidak ditemukan" };

  const newRefreshToken = randomBytes(64).toString("hex");
  const newAccessToken = jwt.sign(
    { id: admin.id, username: admin.username, role: admin.role },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" },
  );

  await updateRefreshToken(token, newRefreshToken);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none" as const,
  };

  res.cookie("access_token", newAccessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refresh_token", newRefreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return { success: true, message: "Token diperbarui" };
};
