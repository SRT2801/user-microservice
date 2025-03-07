export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreate
  extends Omit<IUser, "id" | "createdAt" | "updatedAt"> {}

export interface IUserUpdate
  extends Partial<Omit<IUser, "id" | "createdAt" | "updatedAt">> {}

  