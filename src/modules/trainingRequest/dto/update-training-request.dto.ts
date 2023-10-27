
import { IsNotEmpty } from 'class-validator';
import { RequestStatus } from '../../../types/request-status.enum.js';

export default class UpdateTrainingRequestDto {
  @IsNotEmpty({ message: 'Status is required' })
  public status!: RequestStatus;
}
