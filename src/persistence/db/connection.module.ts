'use strict';

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { I18nModule } from 'nestjs-i18n';
import * as path from 'node:path';
import { models } from '../entity';
import { databaseConfig } from '../../config/db.config';

import { UserController } from '../../controllers/users.controller';
import { AccountController } from '../../controllers/account.controller';
import { AuthenticateController } from '../../controllers/authenticate.controller';

import { UsersRepository } from '../repository/users.repository';
import { AccountRepository } from '../repository/account.repository';

import { AccountService } from '../../service/account.service';
import { UserService } from '../../service/users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../../config/security/auth.service';
import { JwtStrategy } from '../../config/security/jwt.strategy';
import { JwtAuthGuard } from '../../config/security/jwt.AuthGuard';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticateService } from '../../service/authenticate.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsController } from '../../controllers/products.controller';
import { ProductsService } from '../../service/products.service';
import { ProductRepository } from '../repository/product.repository';
import { EateryRepository } from '../repository/eatery.repository';
import { UploadController } from '../../controllers/uploadFile.controller';
import { UploadService } from '../../service/upload.service';
import { ServeStaticModule } from '@nestjs/serve-static';

dotenv.config();

// Kiểm tra môi trường hiện tại
const environment = process.env.NODE_ENV;
const currentConfig = databaseConfig[environment];
const paths = path.join(__dirname, '../../utils/i18n');

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: currentConfig.dialect,
      host: currentConfig.host,
      port: currentConfig.port,
      username: currentConfig.user,
      password: currentConfig.password,
      database: currentConfig.database,
      autoLoadModels: true,
      synchronize: true, // Chỉ nên bật trong môi trường phát triển
    }),
    SequelizeModule.forFeature(models),

    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: paths,
        watch: true,
      },
    }),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        secret: currentConfig.secretKey, // Khóa bí mật để mã hóa JWT
        signOptions: { expiresIn: '1h' }, // Thời gian hết hạn của token
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Để sử dụng ConfigService trong toàn bộ ứng dụng
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../..', 'public', 'images'), // Đường dẫn đến thư mục chứa tệp tĩnh (ví dụ: 'uploads')
      serveRoot: '/public/images', // URL bắt đầu với /uploads sẽ phục vụ các tệp tĩnh từ thư mục 'uploads'
    }),
  ],
  controllers: [
    UserController,
    AccountController,
    AuthenticateController,
    UploadController,
    ProductsController,
  ],
  providers: [
    AccountService,
    ProductsService,
    UserService,
    UploadService,
    AuthenticateService,
    UsersRepository,
    ProductRepository,
    AccountRepository,
    EateryRepository,
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService, I18nModule],
})
export class AppModule {}
