'use strict';

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'node:path';
import { models } from '../entity';
import { databaseConfig } from '../../config/db.config';

import { UserController } from '../../controllers/users.controller';
import { AccountController } from '../../controllers/account.controller';

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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsController } from '../../controllers/products.controller';
import { ProductsService } from '../../service/products.service';
import { ProductRepository } from '../repository/product.repository';
import { EateryRepository } from '../repository/eatery.repository';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthenticateService } from '../../service/authenticate.service';
import { OtpConfig } from '../../config/otp.config';
import { EmailConfig } from '../../config/email.config';
import { FeedBacksRepository } from '../repository/feedBacks.repository';
import { FeedBackController } from '../../controllers/feedBack.controller';
import { FeedBacksService } from '../../service/feedBacks.service';
import logger from '../../config/logger';

dotenv.config();

// Kiểm tra môi trường hiện tại
const environment = process.env.NODE_ENV;
const currentConfig = databaseConfig[environment];
const paths = path.join(__dirname, '../..', 'utils', 'i18n');
logger.error(JSON.stringify(currentConfig));

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
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        secret: currentConfig.secretKey,
        signOptions: { expiresIn: '2m' },
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Để sử dụng ConfigService trong toàn bộ ứng dụng
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../..', 'public', 'images'),
      serveRoot: '/images',
    }),
    CacheModule.register({
      isGlobal: true,
      max: 100,
      ttl: 0,
    }),
  ],
  controllers: [
    UserController,
    AccountController,
    ProductsController,
    FeedBackController,
  ],
  providers: [
    JwtStrategy,
    OtpConfig,
    EmailConfig,
    AuthenticateService,
    FeedBacksService,
    ProductsService,
    AccountService,
    UserService,
    AuthService,
    FeedBacksRepository,
    UsersRepository,
    ProductRepository,
    AccountRepository,
    EateryRepository,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService, I18nModule],
})
export class AppModule {}
