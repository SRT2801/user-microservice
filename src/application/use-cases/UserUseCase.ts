import { injectable, inject } from "inversify";
import { IUserUseCase } from "../../domain/use-cases/IUserUseCase";
import { IUserService } from "../../domain/services/IUserService";
import { IUser, IUserCreate, IUserUpdate } from "../../domain/entities/IUser";
import { TYPES } from "../../infrastructure/inversify/di/types";

@injectable()
export class UserUseCase implements IUserUseCase {
  constructor(@inject(TYPES.IUserService) private userService: IUserService) {}

  async createUser(user: IUserCreate): Promise<Omit<IUser, "password">> {
    return await this.userService.createUser(user);
  }

  async findById(id: IUser["id"]): Promise<IUser | null> {
    return await this.userService.findById(id);
  }

  async findByEmail(email: IUser["email"]): Promise<IUser | null> {
    return await this.userService.findByEmail(email);
  }

  async getAll(): Promise<IUser[]> {
    return await this.userService.getAll();
  }

  async updateUser(
    id: IUser["id"],
    userData: IUserUpdate
  ): Promise<Omit<IUser, "password"> | null> {
    return await this.userService.updateUser(id, userData);
  }
}
