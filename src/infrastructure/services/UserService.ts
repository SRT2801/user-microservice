import { injectable, inject } from "inversify";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IUserService } from "../../domain/services/IUserService";
import { IUser, IUserCreate } from "../../domain/entities/IUser";
import { BcryptAdapter } from "../http/utils/bcrypt/bcrypt";
import { TYPES } from "../inversify/di/types";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.BcryptAdapter) private bcryptAdapter: BcryptAdapter
  ) {}

  async createUser(user: IUserCreate): Promise<Omit<IUser, "password">> {
    const existingUser = await this.userRepository.findByEmail(user.email);

    if (existingUser) {
      throw new Error("El email ya está en uso");
    }

    const hashedPassword = await this.bcryptAdapter.hash(user.password);

    const userWithEncryptedPassword = {
      ...user,
      password: hashedPassword,
    };

    const savedUser = await this.userRepository.save(userWithEncryptedPassword);

    const { password, ...userWithoutPassword } = savedUser;

    return userWithoutPassword;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.userRepository.findByEmail(email);
  }

  async findById(id: number): Promise<IUser | null> {
    return await this.userRepository.findById(id);
  }

  async getAll(): Promise<IUser[]> {
    return await this.userRepository.getAll();
  }
}
