import { Container } from "inversify";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UserRepository } from "../../../infrastructure/persistence/typeorm/repositories/UserRepository";
import { UserService } from "../../../application/services/UserService";
import { DataSource } from "typeorm";
import { databaseConfig } from "../../../infrastructure/database/typeorm-config";

const container = new Container();


const AppDataSource = new DataSource(databaseConfig);

export const initializeContainer = async () => {
  await AppDataSource.initialize();

  container.bind("DataSource").toConstantValue(AppDataSource);
  container.bind<IUserRepository>("IUserRepository").to(UserRepository);
  container.bind<UserService>(UserService).toSelf();

  return container;
};

export { container };
