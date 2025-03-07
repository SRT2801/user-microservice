import { Request, Response } from "express";
import {
  controller,
  httpGet,
  httpPost,
  request,
  response,
} from "inversify-express-utils";
import { inject } from "inversify";
import { IUserUseCase } from "../../../domain/use-cases/IUserUseCase";
import { CreateUserDto } from "../dtos/CreateUserDto";
import { TYPES } from "../../inversify/di/types";
import { Types } from "mysql2";

@controller("/users")
export class UserController {
  constructor(@inject(TYPES.IUserUseCase) private userUseCase: IUserUseCase) {}

  @httpGet("/", TYPES.AuthMiddleware)
  async getAllUsers(@response() res: Response) {
    try {
      const users = await this.userUseCase.getAll();
      return res.status(200).json(users);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al obtener usuarios", error });
    }
  }

  @httpGet("/:id", TYPES.AuthMiddleware)
  async getUserById(@request() req: Request, @response() res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userUseCase.findById(id);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al obtener el usuario", error });
    }
  }

  @httpGet("/email/:email", TYPES.AuthMiddleware)
  async getUserByEmail(@request() req: Request, @response() res: Response) {
    try {
      const email = req.params.email;
      const user = await this.userUseCase.findByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      
      
      const { password, ...userWithoutPassword } = user;
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al obtener el usuario", error });
    }
  }

  @httpPost("/")
  async createUser(@request() req: Request, @response() res: Response) {
    try {
      const createUserDto: CreateUserDto = req.body;
      const newUser = await this.userUseCase.createUser(createUserDto);
      return res.status(201).json(newUser);
    } catch (error: any) {
      if (error.message.includes("email")) {
        return res.status(400).json({ message: error.message });
        
      }
      return res
        .status(500)
        .json({ message: "Error al crear el usuario", error });
    }
  }


}
