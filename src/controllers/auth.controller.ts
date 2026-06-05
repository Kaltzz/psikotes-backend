import { loginService } from "../services/auth.service";

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
  res.clearCookie("access_token", {
    // path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // maxAge: 2 * 60 * 1000, //15 menit
    sameSite: "strict",
  });
  return res.status(200).json({
    message: "Berhasil logout",
  });
};
