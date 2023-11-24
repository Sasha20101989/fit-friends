import type { Auth } from './types/auth.js';
import { TokenEntity } from './token.entity.js';
import { JwtPayload } from 'jsonwebtoken';

export interface TokenServiceInterface {
  generateTokens(dto: JwtPayload): Auth;
  saveToken(userId: string, refreshToken: string): Promise<TokenEntity>;
  removeToken(refreshToken: string): Promise<void>;
  findToken(refreshToken: string): Promise<TokenEntity | null>;
  validateRefreshToken(token: string): Promise<JwtPayload>;
}
