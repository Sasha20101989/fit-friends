import { IsNotEmpty } from 'class-validator';
import { PaymentMethod } from '../../../types/payment-method.enum.js';
import { PurchaseType } from '../../../types/purchase-type.enum.js';
import { Expose } from 'class-transformer';


export default class OrderRdo {
  @Expose()
  public id!: string;

  @Expose()
  purchaseType!: PurchaseType;

  @IsNotEmpty({ message: 'Training id is required' })
  training!: string;

  @Expose()
  price!: number;

  @Expose()
  quantity!: number;

  @Expose()
  totalAmount!: number;

  @Expose()
  paymentMethod!: PaymentMethod;
}
