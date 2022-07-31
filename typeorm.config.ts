import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'postgres-db',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'nest-service',
  entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
  migrationsRun: false,
  logging: true,
  migrations: [
    __dirname + '/migration/**/*.ts',
    __dirname + '/migration/**/*.js',
  ],
  synchronize: true,
};

export = typeOrmConfig;
