import { inject, injectable } from "inversify";
import { Repository, DataSource } from "typeorm";
import { User } from "../entities/User";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import { IUser, IUserCreate } from "../../../../domain/entities/IUser";
import { TYPES } from "../../../inversify/di/types";

@injectable()
export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {
    if (!dataSource.isInitialized) {
      throw new Error("DataSource not initialized");
    }
    this.repository = dataSource.getRepository(User);
  }

  async getAll(): Promise<IUser[]> {
    const users = await this.repository.find();
    return users as IUser[]; 
  }

  async save(user: IUserCreate): Promise<IUser> {
    const userEntity = this.repository.create(user as any);
    const savedUser = await this.repository.save(userEntity);
    return savedUser as unknown as IUser;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.repository.findOne({ where: { email } });
    return user ? (user as IUser) : null;
  }

  async findById(id: number): Promise<IUser | null> {
    const user = await this.repository.findOne({ where: { id } });
    return user ? (user as IUser) : null;
  }
}
