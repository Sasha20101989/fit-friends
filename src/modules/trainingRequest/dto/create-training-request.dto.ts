
import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { RequestStatus } from '../../../types/request-status.enum.js';
import { RequestType } from '../../../types/request-type.enum.js';

export default class CreateTrainingRequestDto {
  @IsOptional()
  public initiator!: string;

  @IsOptional()
  public user!: string;

  @IsOptional()
  public status!: RequestStatus;

  @IsNotEmpty({ message: 'Request type is required' })
  @IsEnum(RequestType, { message: 'Invalid request type' })
  public requestType!: RequestType;
}
