import { deleteRefreshTokenByToken } from "../models/auth.model";
import { loginService, refreshTokenService } from "../services/auth.service";

export const login = async (req: any, res: any) => {
  const getLogin = await loginService(req.body, res);

  if (getLogin == undefined) {
    return;
  }

  const status = getLogin.success ? 200 : 401;

  return res.status(status).json({
    success: getLogin.success,
    message: getLogin.message,
    data: getLogin?.data,
  });
};

export const logout = async (req: any, res: any) => {
  const token = req.cookies?.refresh_token;

  if (token) {
    await deleteRefreshTokenByToken(token);
  }

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none" as const,
  };

  res.clearCookie("access_token", cookieOptions);
  res.clearCookie("refresh_token", cookieOptions);

  return res.status(200).json({ message: "Berhasil logout" });
};

export const refreshToken = async (req: any, res: any) => {
  const token = req.cookies?.refresh_token;
  const refresh = await refreshTokenService(token, req, res);

  if (!refresh.success) return res.status(401).json(refresh);

  return res.status(201).json(refresh);
};
