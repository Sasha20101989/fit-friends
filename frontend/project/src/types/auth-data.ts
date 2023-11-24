import { Token } from '../services/token';

export type AuthData = {
  email: string;
  password: string;
  refreshToken?: string;
};

export type RefreshData = {
  accessToken: Token;
  refreshToken: Token;
};

