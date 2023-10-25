import { Expose } from 'class-transformer';
import TrainingRdo from '../../training/rdo/training.rdo.js';

export default class BalanceRdo {
  @Expose()
  public id!: string;

  @Expose()
  public training!: TrainingRdo;

  @Expose()
  public availableQuantity!: number;
}
