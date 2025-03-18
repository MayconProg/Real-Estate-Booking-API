import { Request, Response } from "express";
import {
  CreateUserData,
  UserLoginData,
  UserService,
} from "../services/user.service";

export class UserController {
  static async getUsers(req: Request, res: Response) {
    const users = await UserService.getAllUsers();

    if (!users) {
      res.status(200).json({ message: "Users Not Found!" });
      return;
    }

    res.status(200).json({ message: "Users Found Successfully!", data: users });
  }

  static async getUser(req: Request, res: Response) {
    const users = await UserService.getUserById(req.params.id);

    if (!users) {
      res.status(200).json({ message: "User Not Found!" });
      return;
    }

    res.status(200).json({ message: "User Found Successfully!", data: users });
  }

  static async register(req: Request, res: Response) {
    try {
      const userData: CreateUserData = req.body;
      const user = await UserService.createUser(userData);

      res
        .status(201)
        .json({ message: "User Created Successfully!", data: user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const userData: UserLoginData = req.body;
      const token = await UserService.userLogin(userData);

      res.status(200).json({ message: "Login Successfully!", token });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      await UserService.updateUser(req.body, req.auth);

      res.status(200).json({ message: "User Updated Successfully!" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await UserService.deleteUser(req.auth);

      res.status(200).json({ message: "User Deleted Successfully!" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
