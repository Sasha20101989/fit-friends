import type { User } from '../../user/types/user.interface.js';
import type { Trainer } from '../../trainer/types/trainer.interface.js';
import { RequestStatus } from './request-status.enum.js';
import { RequestType } from './request-type.enum.js';

export type TrainingRequest = {
  initiator?: User;
  user?: User | Trainer;
  status: RequestStatus;
  requestType: RequestType;
}
