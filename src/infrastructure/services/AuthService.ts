import { injectable, inject } from "inversify";
import jwt from "jsonwebtoken";
import {
  IAuthService,
  ILoginPayload,
  ITokenData,
  IAuthResponse,
} from "../../domain/services/IAuthService";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { BcryptAdapter } from "../http/utils/bcrypt/bcrypt";
import { TYPES } from "../inversify/di/types";
import { ENVIROMENTS } from "../enviroments/enviroments";

@injectable()
export class AuthService implements IAuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
  private readonly JWT_EXPIRES_IN = "24h";

  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.BcryptAdapter) private bcryptAdapter: BcryptAdapter
  ) {}

  async login(payload: ILoginPayload): Promise<IAuthResponse> {
    const { email, password } = payload;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const isPasswordValid = await this.bcryptAdapter.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Credenciales inválidas");
    }

    const tokenData: ITokenData = {
      userId: user.id,
      email: user.email,
    };

    const token = this.generateToken(tokenData);

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  async validateToken(token: string): Promise<ITokenData | null> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as ITokenData;
      return decoded;
    } catch (error) {
      return null;
    }
  }

  private generateToken(data: ITokenData): string {
    return jwt.sign(data, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRES_IN });
  }
}
