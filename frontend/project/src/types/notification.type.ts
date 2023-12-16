import { RequestType } from './request-type.enum';

export type Notification = {
  id?: string;
  user: string;
  text: string;
  type: RequestType;
  createdAt: string;
}
