
import { Expose, Type } from 'class-transformer';
import TrainingRdo from '../../training/rdo/training.rdo.js';
import UserRdo from '../../user/rdo/user.rdo.js';

export default class ReviewRdo {
  @Expose()
  public id!: string;

  @Expose({ name: 'user'})
  @Type(() => UserRdo)
  public user!: UserRdo;

  @Expose({ name: 'training'})
  @Type(() => TrainingRdo)
  public training!: TrainingRdo;

  @Expose()
  public rating!: number;

  @Expose()
  public text!: string;

  @Expose()
  public createdAt!: string;
}
