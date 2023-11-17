import { Expose } from 'class-transformer';

import { Role } from '../../../types/role.enum.js';

export default class LoggedUserRdo {
  @Expose()
  public accessToken!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public role!: Role;

  @Expose()
  public id!: Role;
}
