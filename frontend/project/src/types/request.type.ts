import { RequestStatus } from './request-status.enum';
import { RequestType } from './request-type.enum';
import { Trainer } from './trainer.interface';
import { User } from './user.interface';

export type Request = {
  id?: string;
  initiator?: User;
  user?: User | Trainer;
  status: RequestStatus;
  requestType: RequestType;
}
