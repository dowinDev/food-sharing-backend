import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { serverConfig } from './config/sv.config';
import { AppModule } from './persistence/db/connection.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // config CORS
  const host = serverConfig.server.host;
  const port = serverConfig.server.port;
  const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };

  app.use(cors(corsOptions));

  // Middleware
  app.use(bodyParser.json());
  app.use(cookieParser());

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description for your NestJS app')
    .setVersion('1.0')
    .addBearerAuth(
      // Thêm dòng này để cấu hình JWT token
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'JWT-auth', // Tên này sẽ được dùng để tham chiếu khi thêm token
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // connect to the database and listen for requests
  try {
    SwaggerModule.setup('api', app, document);
    await app.listen(port);
    logger.log(`Swagger is running on http://${host}:${port}/api`);
  } catch (err) {
    logger.error('Unable to connect to the database:', err);
  }
}

bootstrap().then(() => console.log('Server is running'));
