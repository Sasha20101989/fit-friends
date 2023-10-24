import type { Training } from './training.type.js';
import { PaymentMethod } from './payment-method.enum.js';
import { PurchaseType } from './purchase-type.enum.js';

export type TrainingOrder = {
  purchaseType: PurchaseType;
  training: Training;
  price: number;
  quantity: number;
  totalAmount?: number;
  paymentMethod: PaymentMethod;
}
