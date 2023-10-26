
import { IsNotEmpty, IsEmail, Matches, IsOptional, MaxLength, MinLength, IsEnum, IsNumber, IsInt, Min } from 'class-validator';

export default class UpdateNotifyDto {
  @IsNotEmpty({ message: 'Name is required' })
  @Matches(/^[a-zA-Zа-яА-Я\s]*$/, { message: 'The name must contain only letters of the Russian/English alphabet' })
  @MinLength(0, { message: 'Minimum name length must be 0' })
  @MaxLength(0, { message: 'Maximum name length must be 0' })
  public name?: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email address' })
  public email?: string;

  @Matches(/\.(jpg|png)$/, { message: 'Avatar must be in JPG or PNG format' })
  @IsOptional()
  public avatar?: string;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsInt({ message: 'Price must be an integer' })
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  public price?: number;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(0, { message: 'Minimum password length must be 0' })
  @MaxLength(0, { message: 'Maximum password length must be 0' })
  public password?: string;

  @IsEnum(Enum, { message: 'Invalid gender' })
  public gender?: Enum;
}
