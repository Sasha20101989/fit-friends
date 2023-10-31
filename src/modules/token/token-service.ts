import { types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { TokenServiceInterface } from './token-service.interface.js';
import type { ConfigInterface } from '../../core/config/config.interface.js';
import type { Auth } from './types/auth.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { TokenEntity } from './token.entity.js';
import { UserEntity } from '../user/user.entity.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import LoginUserDto from '../user/dto/login-user.dto.js';


@injectable()
export default class TokenService implements TokenServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface) private readonly configService: ConfigInterface<RestSchema>,
    @inject(AppComponent.TokenModel) private readonly tokenModel: types.ModelType<TokenEntity>
  ) {}

  public generateTokens(dto: LoginUserDto): Auth{
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

  public async validateAccessToken(token: string): Promise<UserEntity | null>{
    try{
      const userData = jwt.verify(token, this.configService.get('JWT_ACCESS_SECRET')) as UserEntity;
      return userData;
    }catch(error){
      return null;
    }
  }

  public async validateRefreshToken(token: string): Promise<UserEntity | null>{
    try{
      const userData = jwt.verify(token, this.configService.get('JWT_REFRESH_SECRET')) as UserEntity;
      return userData;
    }catch(error){
      return null;
    }
  }
}
