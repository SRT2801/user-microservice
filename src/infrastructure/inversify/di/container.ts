import { Container } from "inversify";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UserRepository } from "../../persistence/typeorm/repositories/UserRepository";
import { UserService } from "../../services/UserService";
import { AuthService } from "../../services/AuthService";
import { databaseConfig } from "../../persistence/typeorm/config/typeorm-config";
import { IUserService } from "../../../domain/services/IUserService";
import { IUserUseCase } from "../../../domain/use-cases/IUserUseCase";
import { IAuthService } from "../../../domain/services/IAuthService";
import { UserUseCase } from "../../../application/use-cases/UserUseCase";
import { BcryptAdapter } from "../../http/utils/bcrypt/bcrypt";
import { AuthMiddleware } from "../../http/middlewares/AuthMiddleware";
import { TYPES } from "./types";

const container = new Container();

export const initializeContainer = async () => {
  try {
    if (!databaseConfig.isInitialized) {
      await databaseConfig.initialize();
      console.log("Base de datos inicializada correctamente");
    }

    
    container.bind(TYPES.DataSource).toConstantValue(databaseConfig);
    container.bind(TYPES.BcryptAdapter).to(BcryptAdapter);

    
    container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

    
    container.bind<IUserService>(TYPES.IUserService).to(UserService);
    container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);

    
    container.bind<IUserUseCase>(TYPES.IUserUseCase).to(UserUseCase);

   
    container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);

    return container;
  } catch (error) {
    console.error("Error al inicializar el contenedor:", error);
    throw error;
  }
};

export { container };
