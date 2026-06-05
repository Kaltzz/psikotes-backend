import { NextFunction } from "express";

export const authRoleMiddleware =
  (role: string) => (req: any, res: any, next: NextFunction) => {
    try {
      if (!req.user)
        return res.status(403).json({
          message: "Role tidak ditemukan",
        });

      const userRole = req.user.role;
      if (userRole === role) {
        next();
      } else {
        return res.status(403).json({
          message: "Anda tidak memiliki akses",
        });
      }
    } catch (error) {
      return res.status(403).json({
        message: error,
      });
    }
  };
