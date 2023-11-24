import { types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import jwt, { JwtPayload } from 'jsonwebtoken';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { TokenServiceInterface } from './token-service.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import type { Auth } from './types/auth.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { TokenEntity } from './token.entity.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import RefreshTokenDto from '../user/dto/refresh-token.dto.js';

@injectable()
export default class TokenService implements TokenServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface) private readonly configService: ConfigInterface<RestSchema>,
    @inject(AppComponent.TokenModel) private readonly tokenModel: types.ModelType<TokenEntity>
  ) {}

  public generateTokens(dto: RefreshTokenDto): Auth{
    this.logger.info('Create access token...');
    const { exp, iat, ...dtoWithoutExp } = dto;
    const accessToken = jwt.sign(
      dtoWithoutExp,
      this.configService.get('JWT_ACCESS_SECRET'),
      {
        expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRATION_TIME')
      });

    this.logger.info('Create refresh token...');
    const refreshToken = jwt.sign(
      dtoWithoutExp,
      this.configService.get('JWT_REFRESH_SECRET'),
      {
        expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION_TIME')
      });

    return {
      accessToken,
      refreshToken
    };
  }

  public async saveToken(userId: string, refreshToken: string): Promise<TokenEntity>{
    const tokenDta = await this.tokenModel.findOne({user: userId});

    if(tokenDta){
      tokenDta.refreshToken = refreshToken;

      this.logger.info('Refresh token updated');
      return tokenDta.save();
    }

    const token = await this.tokenModel.create({user: userId, refreshToken});
    this.logger.info('Refresh token created');
    return token;
  }

  public async removeToken(refreshToken: string): Promise<void>{
    await this.tokenModel.deleteOne({ refreshToken }).exec();
  }

  public async findToken(refreshToken: string): Promise<TokenEntity | null>{
    const token = await this.tokenModel.findOne({ refreshToken }).exec();
    return token;
  }

  public async validateRefreshToken(token: string): Promise<JwtPayload>{
    try {
      const decodedToken = jwt.verify(token, this.configService.get('JWT_REFRESH_SECRET')) as JwtPayload;
      return decodedToken;
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}
