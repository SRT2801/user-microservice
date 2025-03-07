import { Request, Response } from "express";
import {
  controller,
  httpPost,
  request,
  response,
} from "inversify-express-utils";
import { inject } from "inversify";
import {
  IAuthService,
  ILoginPayload,
} from "../../../domain/services/IAuthService";
import { TYPES } from "../../inversify/di/types";

@controller("/auth")
export class AuthController {
  constructor(@inject(TYPES.IAuthService) private authService: IAuthService) {}

  @httpPost("/login")
  async login(@request() req: Request, @response() res: Response) {
    try {
      const loginPayload: ILoginPayload = req.body;

      if (!loginPayload.email || !loginPayload.password) {
        return res.status(400).json({
          message: "Email y contraseña son requeridos",
        });
      }

      const authResponse = await this.authService.login(loginPayload);

      return res.status(200).json(authResponse);
    } catch (error: any) {
      return res.status(401).json({
        message: error.message || "Error en autenticación",
      });
    }
  }
}
