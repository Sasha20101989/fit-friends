import { Role } from './role.enum';

export type UserData = {
  id: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  role: Role;
};
