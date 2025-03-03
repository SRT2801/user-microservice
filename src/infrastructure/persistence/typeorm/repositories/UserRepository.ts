import { inject, injectable } from "inversify";
import { Repository, DataSource } from "typeorm";
import { User } from "../../../../domain/entities/User";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";

@injectable()
export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor(@inject("DataSource") private dataSource: DataSource) {
    if (!dataSource.isInitialized) {
      throw new Error("DataSource not initialized");
    }
    this.repository = this.dataSource.getRepository(User);
  }
    async getAll(): Promise<User[]> {
        return await this.repository.find();
    }

  async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return await this.repository.findOne({ where: { id } });
  }
}
