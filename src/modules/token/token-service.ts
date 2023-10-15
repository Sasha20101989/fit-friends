import { types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken'

import { AppComponent } from '../../types/app-component.enum.js';
import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import { TokenEntity } from './token.entity.js';
import { TokenServiceInterface } from './token-service.interface.js';
import { ConfigInterface } from '../../core/config/config.interface.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { AuthTokens } from '../../types/auth-tokens.js';
import LoginUserDto from '../user/dto/login-user.dto.js';

@injectable()
export default class TokenService implements TokenServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface) private readonly configService: ConfigInterface<RestSchema>,
    @inject(AppComponent.TokenModel) private readonly tokenModel: types.ModelType<TokenEntity>
  ) {}

  public generateTokens(dto: LoginUserDto): AuthTokens{
    this.logger.info('Create access token...');
    const accessToken = jwt.sign(
      dto,
      this.configService.get('JWT_ACCESS_SECRET'),
      {
        expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRATION_TIME')
      });

    this.logger.info('Create refresh token...');
    const refreshToken = jwt.sign(
      dto,
      this.configService.get('JWT_REFRESH_SECRET'),
      {
        expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION_TIME')
      });

    return {
      accessToken,
      refreshToken
    }
  }

  public async saveToken(userId: string, refreshToken: string): Promise<TokenEntity>{
    const tokenDta = await this.tokenModel.findOne({user: userId});

    if(tokenDta){
      tokenDta.refreshToken = refreshToken;

      this.logger.info(`Refresh token updated`);
      return tokenDta.save();
    }

    const token = await this.tokenModel.create({user: userId, refreshToken});
    this.logger.info(`Refresh token created`);
    return token;
  }
}
