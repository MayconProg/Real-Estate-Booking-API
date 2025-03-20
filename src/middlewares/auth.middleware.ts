import { UserRole } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare module "express" {
  interface Request {
    auth?: {
      userId: string;
      role: UserRole;
    };
  }
}

export const authenticate =
  () => (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Missing Authorization!" });
      return;
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY as string
      ) as { userId: string; role: UserRole };
      req.auth = { userId: decoded.userId, role: decoded.role };
      next();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error!" });
      return;
    }
  };
