import { PaymentMethod } from '../types/payment-method.enum.js';
import { PurchaseType } from '../types/purchase-type.enum.js';
import { Expose, Type } from 'class-transformer';
import TrainingRdo from '../../training/rdo/training.rdo.js';

export default class OrderRdo {
  @Expose()
  public id!: string;

  @Expose()
  public purchaseType!: PurchaseType;

  @Expose({ name: 'training'})
  @Type(() => TrainingRdo)
  public training!: TrainingRdo;

  @Expose()
  public price!: number;

  @Expose()
  public quantity!: number;

  @Expose()
  public totalAmount!: number;

  @Expose()
  public paymentMethod!: PaymentMethod;

  @Expose()
  public createdAt!: string;
}
