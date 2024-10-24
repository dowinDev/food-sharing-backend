'use strict';

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
import { Roles } from '../config/security/roles.decorator';
import { rolesEnum } from '../utils/Constants';

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
      throw error;
    }
  }

  //
  // @Post()
  // logout(req, res) {
  //   try {
  //     const user = await accountService.logout(req.body);
  //     res.json(user);
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }
}
