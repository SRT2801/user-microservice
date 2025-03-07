import { IUser } from "../entities/IUser";

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ITokenData {
  userId: number;
  email: string;
}

export interface IAuthResponse {
  user: Omit<IUser, "password">;
  token: string;
}

export interface IAuthService {
  login(payload: ILoginPayload): Promise<IAuthResponse>;
  validateToken(token: string): Promise<ITokenData | null>;
}
