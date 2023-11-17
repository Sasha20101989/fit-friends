import { IsNotEmpty, IsEmail, MaxLength, MinLength } from 'class-validator';
import { Role } from '../../../types/role.enum.js';

export default class LoginUserDto {
  public id?: string;

  @IsNotEmpty({ message: 'Email are required' })
  @IsEmail({}, { message: 'Invalid email address' })
  public email!: string;

  public role?: Role;

  @IsNotEmpty({ message: 'Password are required' })
  @MinLength(6, { message: 'Minimum password length must be 6' })
  @MaxLength(12, { message: 'Maximum password length must be 12' })
  public password!: string;
}
