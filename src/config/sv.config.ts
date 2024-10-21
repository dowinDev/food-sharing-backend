import * as dotenv from 'dotenv';

dotenv.config();

export const serverConfig = {
  server: {
    port: process.env.SV_PORT,
    host: process.env.SV_HOST,
  },
};
