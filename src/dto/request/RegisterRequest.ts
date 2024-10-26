'use strict';

import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequest {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  authKey: string;

  static validate(request: any): RegisterRequest {
    const registerRequest = new RegisterRequest();

    const { username, email, password } = request;

    if (!username || typeof username !== 'string') {
      throw new Error('Username is required and must be a string');
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      throw new Error('Valid email is required');
    }

    if (!password || password.length < 6) {
      throw new Error(
        'Password is required and must be at least 6 characters long',
      );
    }

    registerRequest.userName = username;
    registerRequest.email = email;
    registerRequest.password = password;

    return registerRequest;
  }
}
