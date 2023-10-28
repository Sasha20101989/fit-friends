
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export default class CreateSubscriberDto {
  @IsNotEmpty({ message: 'User is required' })
  public user!: string;

  @IsNotEmpty({ message: 'Text is required' })
  @MinLength(10, { message: 'Text name length must be 10' })
  @MaxLength(140, { message: 'Text name length must be 140' })
  public text!: string;
}
