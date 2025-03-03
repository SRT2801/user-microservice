import { DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';
import { authPlugins } from 'mysql2';

dotenv.config();

export const databaseConfig: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['src/domain/entities/**/*.ts'],
    migrations: ['src/infrastructure/persistence/typeorm/migrations/**/*.ts'],
    synchronize: true,
    driver: require('mysql2')
};