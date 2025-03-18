import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";

export interface createUserData {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface userLoginData {
  email: string;
  password: string;
}

export interface updateUserData {
  currentPassword: string;
  newPassword: string;
}

interface AuthInterface {
  userId: string;
  role: Role;
}

export class UserService {
  static async getAllUsers() {
    const users = await prisma.user.findMany();

    return users;
  }

  static async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  static async createUser(data: createUserData) {
    const { name, email, password, role } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return user;
  }

  static async userLogin(data: userLoginData) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User Not Found!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid Credentials!");
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    return token;
  }

  static async updateUser(data: updateUserData, auth?: AuthInterface) {
    const userId = auth?.userId;
    const { currentPassword, newPassword } = data;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User Not Found!");
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      throw new Error("Current Password Invalid!");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  static async deleteUser(auth?: AuthInterface) {
    const userId = auth?.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User Not Found!");
    }

    await prisma.user.delete({
      where: { id: userId },
    });
  }
}
