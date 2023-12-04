import type { Auth } from './types/auth.js';
import { TokenEntity } from './token.entity.js';
import RefreshTokenDto from '../user/dto/refresh-token.dto.js';
import { JwtPayload } from 'jsonwebtoken';

export interface TokenServiceInterface {
  generateTokens(dto: RefreshTokenDto): Auth;
  saveRefreshToken(userId: string, refreshToken: string): Promise<TokenEntity>;
  removeToken(refreshToken: string): Promise<void>;
  findToken(refreshToken: string): Promise<TokenEntity | null>;
  exists(refreshToken: string): Promise<boolean>;
  updateRefreshToken(refreshToken: string): Promise<Auth | null>;
  decodeRefreshToken(refreshToken: string): Promise<JwtPayload | null>;
  updateAccessToken(decodedRefreshToken: RefreshTokenDto): Promise<string>;
}
