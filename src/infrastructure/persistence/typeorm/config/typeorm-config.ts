import { DataSource } from "typeorm";
import { ENVIROMENTS } from "../../../enviroments/enviroments";
import { User } from "../entities/User";


export const databaseConfig = new DataSource({
  type: "mysql",
  driver: require("mysql2"),
  host: ENVIROMENTS.DB_HOST,
  port: ENVIROMENTS.DB_PORT,
  username: ENVIROMENTS.DB_USERNAME,
  password: ENVIROMENTS.DB_PASSWORD,
  database: ENVIROMENTS.DB_NAME,
  entities: [User],
  synchronize: true,
  logging: false,
});
