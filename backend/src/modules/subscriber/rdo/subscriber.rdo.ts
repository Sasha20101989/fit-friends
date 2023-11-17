
import { Expose, Type } from 'class-transformer';
import UserRdo from '../../user/rdo/user.rdo.js';
import TrainerRdo from '../../trainer/rdo/trainer.rdo.js';

export default class SubscriberRdo {
  @Expose()
  public id!: string;

  @Expose({ name: 'user'})
  @Type(() => UserRdo)
  public user!: UserRdo;

  @Expose({ name: 'trainer'})
  @Type(() => TrainerRdo)
  public trainer!: TrainerRdo;
}
