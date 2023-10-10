import type { User } from './user.interface.js';
import type { Trainer } from './trainer.interface.js';
import { RequestStatus } from './request-status.enum.js';

export type PersonalTrainingRequest = {
  initiator: User;
  user: User | Trainer;
  createdAt: Date;
  status: RequestStatus;
  updatedAt?: Date;
}
