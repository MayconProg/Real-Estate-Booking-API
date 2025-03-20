import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
import { UserRole } from "@prisma/client";
import jwt from "jsonwebtoken";

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UpdateUserData {
  currentPassword: string;
  newPassword: string;
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

    if (!user) {
      throw new Error("User Not Found!");
    }

    return user;
  }

  static async createUser(data: CreateUserData) {
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

  static async userLogin(data: UserLoginData) {
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

  static async updateUser(data: UpdateUserData, userId?: string) {
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

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return updatedUser;
  }

  static async deleteUser(userId?: string) {
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
