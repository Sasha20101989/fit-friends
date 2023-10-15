import type { Auth } from '../../types/auth.js';
import LoginUserDto from '../user/dto/login-user.dto.js';
import { TokenEntity } from './token.entity.js';
import { UserEntity } from '../user/user.entity.js';

export interface TokenServiceInterface {
  generateTokens(dto: LoginUserDto): Auth;
  saveToken(userId: string, refreshToken: string): Promise<TokenEntity>;
  removeToken(refreshToken: string): Promise<void>;
  findToken(refreshToken: string): Promise<TokenEntity | null>;
  validateAccessToken(token: string): Promise<UserEntity | null>
  validateRefreshToken(token: string): Promise<UserEntity | null>;
}
