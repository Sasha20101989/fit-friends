import { PaymentMethod } from '../types/payment-method.enum';
import { PurchaseType } from '../types/purchase-type.enum';

export default class CreateOrderDto {
  public purchaseType!: PurchaseType;
  public quantity!: number;
  public paymentMethod!: PaymentMethod;
}
