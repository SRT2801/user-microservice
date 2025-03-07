import { IUser, IUserCreate } from "../entities/IUser";

export interface IUserRepository {
  save(user: IUserCreate): Promise<IUser>;
  findByEmail(user: IUser["email"]): Promise<IUser | null>;
  findById(id: IUser["id"]): Promise<IUser | null>;
  getAll(): Promise<IUser[]>;
}
