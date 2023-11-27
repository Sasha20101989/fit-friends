import { Role } from '../../../../backend/src/types/role.enum.js';

export type UserData = {
  id: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  role: Role;
};
