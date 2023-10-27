import type { User } from './user.interface.js';
import type { Trainer } from './trainer.interface.js';
import { RequestStatus } from './request-status.enum.js';
import { RequestType } from './request-type.enum.js';

export type TrainingRequest = {
  initiator: User;
  user: User | Trainer;
  status: RequestStatus;
  requestType: RequestType;
}
