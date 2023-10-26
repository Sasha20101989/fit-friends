
import { Expose } from 'class-transformer';

export default class ReviewRdo {
  @Expose()
  public id!: string;

  @Expose()
  public user!: string;

  @Expose()
  public training!: string;

  @Expose()
  public rating!: number;

  @Expose()
  public text!: string;

  @Expose()
  public createdAt!: string;
}
