import { Role } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare module "express" {
  interface Request {
    auth?: {
      userId: string;
      role: Role;
    };
  }
}

export const authenticate =
  () => (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ message: "Missing Authorization!" });
      return;
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY as string
      ) as { userId: string; role: Role };
      req.auth = { userId: decoded.userId, role: decoded.role };
      next();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error!" });
      return;
    }
  };
