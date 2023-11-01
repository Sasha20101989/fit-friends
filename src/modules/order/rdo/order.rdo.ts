import { IsNotEmpty } from 'class-validator';
import { PaymentMethod } from '../types/payment-method.enum.js';
import { PurchaseType } from '../types/purchase-type.enum.js';
import { Expose } from 'class-transformer';

export default class OrderRdo {
  @Expose()
  public id!: string;

  @Expose()
  public purchaseType!: PurchaseType;

  @IsNotEmpty({ message: 'Training id is required' })
  public training!: string;

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
