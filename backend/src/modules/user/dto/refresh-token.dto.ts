import { Role } from '../../../types/role.enum.js';

export default class RefreshTokenDto {
  public id?: string;
  public email?: string;
  public role?: Role;
  public password?: string;
  public refreshToken?: string;
  public exp?: number;
  public iat?: number;
}
