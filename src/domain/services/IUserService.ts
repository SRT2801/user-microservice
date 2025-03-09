import { IUser, IUserCreate, IUserUpdate } from "../entities/IUser";

export interface IUserService {
  createUser(user: IUserCreate): Promise<Omit<IUser, "password">>;
  findById(id: IUser["id"]): Promise<IUser | null>;
  findByEmail(email: IUser["email"]): Promise<IUser | null>;
  getAll(): Promise<IUser[]>;
  updateUser(
    id: IUser["id"],
    userData: IUserUpdate
  ): Promise<Omit<IUser, "password"> | null>;
}
