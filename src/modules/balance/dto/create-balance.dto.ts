import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export default class CreateBalanceDto{
  @IsNotEmpty({ message: 'Training is required' })
  public training!: string;

  @IsNotEmpty({ message: 'Available Quantity is required' })
  @IsNumber({}, { message: 'Available Quantity must be a number' })
  @IsInt({ message: 'Available Quantity must be an integer' })
  @Min(0, { message: 'Available Quantity must be greater than or equal to 0' })
  public availableQuantity!: number;
}
