import { AuthTokens } from '../../types/auth-tokens.js';
import { TokenEntity } from './token.entity.js';

export interface TokenServiceInterface {
  generateTokens(dto: object): AuthTokens;
  saveToken(userId: string, refreshToken: string): Promise<TokenEntity>;
}
