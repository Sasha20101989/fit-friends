
import { IsNotEmpty, IsEnum } from 'class-validator';
import { RequestType } from '../../../types/request-type.enum.js';

export default class CreateTrainingRequestDto {
  @IsNotEmpty({ message: 'Request type is required' })
  @IsEnum(RequestType, { message: 'Invalid request type' })
  public requestType!: RequestType;
}
