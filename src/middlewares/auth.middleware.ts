import { NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: any, res: any, next: NextFunction) => {
  const cookie = req.cookies.access_token;
  if (!cookie) {
    return res.status(401).json({
      message: "Unauthorized. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET!);
    req.user = decoded;
    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired.",
      });
    }
    return res.status(401).json({
      message: "Unauthorized. Invalid token.",
    });
  }
};
