
import { Expose, Type } from 'class-transformer';
import UserRdo from '../../user/rdo/user.rdo.js';
import { RequestStatus } from '../../../types/request-status.enum.js';
import { RequestType } from '../../../types/request-type.enum.js';

export default class TrainingRequestRdo {
  @Expose({ name: 'initiator'})
  @Type(() => UserRdo)
  public initiator!: UserRdo;

  @Expose({ name: 'user'})
  @Type(() => UserRdo)
  public user!: UserRdo;

  @Expose()
  public status!: RequestStatus;

  @Expose()
  public requestType!: RequestType;
}
