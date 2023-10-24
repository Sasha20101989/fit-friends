import { IsNotEmpty, Min, Max, IsInt, IsNumber } from 'class-validator';
import { PaymentMethod } from '../../../types/payment-method.enum.js';
import { PurchaseType } from '../../../types/purchase-type.enum.js';


export default class CreateOrderDto {
  @IsNotEmpty({ message: 'Purchase type is required' })
  purchaseType!: PurchaseType;

  @IsNotEmpty({ message: 'Training id is required' })
  training!: string;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsInt({ message: 'Price must be an integer' })
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  price!: number;

  @IsNotEmpty({ message: 'Quantity is required' })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @IsInt({ message: 'Quantity must be an integer' })
  @Min(1, { message: 'Quantity must be greater than or equal to 1' })
  @Max(50, { message: 'Quantity must be greater than or equal to 50' })
  quantity!: number;

  @IsNotEmpty({ message: 'Payment method is required' })
  paymentMethod!: PaymentMethod;
}
