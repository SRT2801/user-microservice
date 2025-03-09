import { IUser, IUserCreate, IUserUpdate } from "../entities/IUser";

export interface IUserRepository {
  save(user: IUserCreate): Promise<IUser>;
  findByEmail(user: IUser["email"]): Promise<IUser | null>;
  findById(id: IUser["id"]): Promise<IUser | null>;
  getAll(): Promise<IUser[]>;
  update(id: IUser["id"], userData: IUserUpdate): Promise<IUser | null>;
}
