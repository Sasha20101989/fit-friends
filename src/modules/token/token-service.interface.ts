import { AuthTokens } from '../../types/auth-tokens.js';
import LoginUserDto from '../user/dto/login-user.dto.js';
import { TokenEntity } from './token.entity.js';

export interface TokenServiceInterface {
  generateTokens(dto: LoginUserDto): AuthTokens;
  saveToken(userId: string, refreshToken: string): Promise<TokenEntity>;
}
