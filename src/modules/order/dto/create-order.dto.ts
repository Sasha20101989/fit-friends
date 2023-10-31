import { IsNotEmpty, Min, Max, IsInt, IsNumber } from 'class-validator';
import { PaymentMethod } from '../types/payment-method.enum.js';
import { PurchaseType } from '../types/purchase-type.enum.js';


export default class CreateOrderDto {
  @IsNotEmpty({ message: 'Purchase type is required' })
  public purchaseType!: PurchaseType;

  @IsNotEmpty({ message: 'Quantity is required' })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @IsInt({ message: 'Quantity must be an integer' })
  @Min(1, { message: 'Quantity must be greater than or equal to 1' })
  @Max(50, { message: 'Quantity must be greater than or equal to 50' })
  public quantity!: number;

  @IsNotEmpty({ message: 'Payment method is required' })
  public paymentMethod!: PaymentMethod;
}
