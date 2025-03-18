import { Role } from "@prisma/client";
import z from "zod";

export const getUserByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.nativeEnum(Role).default(Role.USER),
  }),
});

export const userLoginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    currentPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    newPassword: z
      .string()
      .min(6, "New Password must be at least 6 characters long"),
  }),
});
