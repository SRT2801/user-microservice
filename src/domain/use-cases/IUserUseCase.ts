import { IUser, IUserCreate } from "../entities/IUser";

export interface IUserUseCase {
  createUser(user: IUserCreate): Promise<Omit<IUser, "password">>;
  findById(id: IUser["id"]): Promise<IUser | null>;
  findByEmail(email: IUser["email"]): Promise<IUser | null>;
  getAll(): Promise<IUser[]>;
}
