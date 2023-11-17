
import { Expose, Type } from 'class-transformer';
import UserRdo from '../../user/rdo/user.rdo.js';

export default class NotificationRdo {
  @Expose()
  public id!: string;

  @Expose()
  public createdAt!: string;

  @Expose()
  public text!: string;

  @Expose({ name: 'user'})
  @Type(() => UserRdo)
  public user!: UserRdo;
}
