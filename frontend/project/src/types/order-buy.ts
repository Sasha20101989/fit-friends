import { PaymentMethod } from './payment-method.enum.js';
import { PurchaseType } from './purchase-type.enum';

export type OrderBuy = {
  purchaseType: PurchaseType;
  quantity: number;
  paymentMethod: PaymentMethod;
}
