import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { IAuthService } from "../../../domain/services/IAuthService";
import { TYPES } from "../../inversify/di/types";

@injectable()
export class AuthMiddleware extends BaseMiddleware {
  constructor(@inject(TYPES.IAuthService) private authService: IAuthService) {
    super();
  }

  public async handler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      res.status(401).json({ message: "Token no proporcionado" });
      return;
    }

    try {
      const decoded = await this.authService.validateToken(token);

      if (!decoded) {
        res.status(401).json({ message: "Token inválido" });
        return;
      }

    
      (req as any).user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "No autorizado" });
    }
  }

  private extractTokenFromHeader(req: Request): string | null {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    return authHeader.substring(7); // Quitar "Bearer " del token
  }
}
