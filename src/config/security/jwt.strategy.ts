import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
// import { JwtPayload } from './jwt-payload.interface';
import { databaseConfig } from '../db.config';
import { AuthPayload } from '../auth-payload';

dotenv.config();
const environment = process.env.NODE_ENV;
const currentConfig = databaseConfig[environment];

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: currentConfig.secretKey,
    });
  }

  async validate(payload: AuthPayload) {
    const { id, role } = payload;
    return { id, role }; // Trả về đối tượng chứa userId và role để lưu trong request
  }
}
