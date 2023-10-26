
import { Expose, Type } from 'class-transformer';

export default class ReviewRdo {
  @Expose()
  public id!: string;

  @Expose()
  public trainingLevel!: TrainingLevel;

  @Expose({ name: 'trainer'})
  @Type(() => TrainerRdo)
  public trainer!: TrainerRdo;
}
