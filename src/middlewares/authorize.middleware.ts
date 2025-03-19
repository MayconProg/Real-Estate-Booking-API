import { Role } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

export const authorize =
  (roles: Role[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole = req.auth?.role as Role;

      if (!roles.includes(userRole)) {
        res.status(403).json({
          error: "Forbidden: You don't have permission to perform this action!",
        });
        return;
      }

      next();
    } catch (error: any) {
      res.status(500).json({ error: "Internal Server Error!" });
      return;
    }
  };
