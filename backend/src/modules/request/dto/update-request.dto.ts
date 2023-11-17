
import { IsNotEmpty } from 'class-validator';
import { RequestStatus } from '../types/request-status.enum.js';

export default class UpdateRequestDto {
  @IsNotEmpty({ message: 'Status is required' })
  public status!: RequestStatus;
}
