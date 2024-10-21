import * as dotenv from 'dotenv';
import * as process from 'node:process';

dotenv.config();

export const databaseConfig = {
  dev: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
    dialect: process.env.DB_DIALECT,
    language: process.env.SV_LANG,
    secretKey: process.env.SECRET_KEY,
  },
  test: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
  },
};
