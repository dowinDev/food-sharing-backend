import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthenticationResponse } from '../dto/response/AuthenticationResponse';
import { AuthenticationRequest } from '../dto/request/AuthenticationRequest';
import { ResponseWrapper } from '../config/response/response-wrapper';

@Controller('api/authenticate')
export class AuthenticateController {
  // @Post('/authenticate')
  // @ApiOperation({ tags: ['Authenticate'], summary: 'Authenticate' })
  // @ApiResponse({ status: 200, description: 'Return all users.' })
  // authenticate(
  //   @Body() rq: AuthenticationRequest,
  // ): ResponseWrapper<AuthenticationResponse> {
  //   return AuthenticationService;
  // }
}
