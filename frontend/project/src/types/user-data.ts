import { Token } from '../services/token.js';
import { Role } from './role.enum';

export type UserData = {
  id: string;
  email: string;
  accessToken: Token.Access;
  refreshToken: Token.Refresh;
  role: Role;
};
