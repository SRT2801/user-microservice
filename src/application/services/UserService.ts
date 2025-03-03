import { injectable, inject } from "inversify";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { CreateUserDto } from "../../interfaces/http/dtos/CreateUserDto";
import * as bcrypt from 'bcrypt';

@injectable()
export class UserService {
  constructor(
    @inject("IUserRepository") private userRepository: IUserRepository
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    const hashedPassword = await bcrypt.hash(createUserDto.password,10)
    Object.assign(user, createUserDto);
    return await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.getAll();
  }
}
