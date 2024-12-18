'use strict';

import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from '../service/account.service';
import { RegisterRequest } from '../dto/request/RegisterRequest';
import { AuthenticationResponse } from '../dto/response/AuthenticationResponse';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseWrapper } from '../config/response/response-wrapper';
import { AuthenticationRequest } from '../dto/request/AuthenticationRequest';
import { JwtAuthGuard } from '../config/security/jwt.AuthGuard';
import { GetUserId, Roles } from '../config/security/roles.decorator';
import { rolesEnum } from '../utils/Constants';
import logger from '../config/logger';
import { RefreshTokenRequest } from '../dto/request/refreshTokenRequest';

@ApiTags('Account')
@Controller('api/accounts')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('/test')
  @Roles(rolesEnum.USER)
  @ApiOperation({ tags: ['test-api'], summary: 'Get hello world' })
  getHello(): ResponseWrapper<string> {
    const message = this.accountService.getHello();
    return ResponseWrapper.success(message);
  }

  @Post('/register')
  @ApiOperation({ tags: ['Account'], summary: 'Register new account' })
  @ApiResponse({ status: 200, description: 'Return authentication response.' })
  async register(
    @Body() req: RegisterRequest,
  ): Promise<ResponseWrapper<AuthenticationResponse>> {
    try {
      const data = await this.accountService.registerUser(req, rolesEnum.USER);
      return ResponseWrapper.success(data);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  @Post('/login')
  @ApiOperation({ tags: ['Account'], summary: 'login new account' })
  async login(@Body() rq: AuthenticationRequest) {
    try {
      const user = await this.accountService.login(rq, rolesEnum.USER);
      return ResponseWrapper.success(user);
    } catch (error) {
      console.error('Error:', error);
      logger.error('Error:', error);
      throw error;
    }
  }

  @Post('send-otp')
  @ApiOperation({ tags: ['Account'], summary: 'send otp' })
  async sendOtp(@Body('email') email: string) {
    try {
      await this.accountService.sendOTP(email);
      return ResponseWrapper.success();
    } catch (error) {
      console.error('send otp error:', error);
      logger.error('send otp error:', error);
      throw error;
    }
  }

  @Post('verify-otp')
  async verifyOtp(@Body('email') email: string, @Body('otp') otp: string) {
    try {
      const verify = await this.accountService.verifyOTP(email, otp);
      return ResponseWrapper.success(verify);
    } catch (error) {
      console.error('verify otp error:', error);
      logger.error('verify otp error:', error);
      throw error;
    }
  }

  @Post('checkToken')
  @Roles(rolesEnum.ADMIN, rolesEnum.USER)
  async checkToken() {
    console.log('token is active');
    return ResponseWrapper.success();
  }

  @Post('refresh')
  async refresh(@Body() rq: RefreshTokenRequest) {
    try {
      const token = await this.accountService.refreshAccessToken(
        rq.refreshToken,
      );
      return ResponseWrapper.success(token);
    } catch (error) {
      console.error('refresh token error:', error);
      logger.error('refresh token error:', error);
      throw error;
    }
  }

  @Post('logout')
  @Roles(rolesEnum.USER, rolesEnum.ADMIN)
  async logout(@GetUserId() userId: number) {
    try {
      await this.accountService.logOut(userId);
      return ResponseWrapper.success();
    } catch (error) {
      console.error('logout error:', error);
      logger.error('logout error:', error);
      throw error;
    }
  }
}
