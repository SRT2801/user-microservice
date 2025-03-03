import { controller, httpGet, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import { Request, Response } from "express";
import { UserService } from "../../application/services/UserService";
import { CreateUserDto } from "../http/dtos/CreateUserDto";

@controller("/users")
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  @httpGet("/")
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  @httpPost("/")
  async createUser(req: Request, res: Response) {
    try {
      const userDto = req.body as CreateUserDto;
      const user = await this.userService.createUser(userDto);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  @httpGet("/email/:email")
  async getUserByEmail(req: Request, res: Response) {
    try {
      const email = req.params.email;
      const user = await this.userService.findByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  @httpGet("/:id")
  async getUserById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userService.findById(id);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
