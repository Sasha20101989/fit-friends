import { IsNotEmpty, Min, Max, IsInt, IsNumber } from 'class-validator';
import { PaymentMethod } from '../types/payment-method.enum.js';
import { PurchaseType } from '../types/purchase-type.enum.js';
import { ORDER_QUANTITY_CONSTRAINTS } from '../order.const.js';


export default class CreateOrderDto {
  @IsNotEmpty({ message: 'Purchase type is required' })
  public purchaseType!: PurchaseType;

  @IsNotEmpty({ message: 'Quantity is required' })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @IsInt({ message: 'Quantity must be an integer' })
  @Min(ORDER_QUANTITY_CONSTRAINTS.MIN, { message: `Quantity must be greater than or equal to ${ORDER_QUANTITY_CONSTRAINTS.MIN}` })
  @Max(ORDER_QUANTITY_CONSTRAINTS.MAX, { message: `Quantity must be greater than or equal to ${ORDER_QUANTITY_CONSTRAINTS.MAX}` })
  public quantity!: number;

  @IsNotEmpty({ message: 'Payment method is required' })
  public paymentMethod!: PaymentMethod;
}
