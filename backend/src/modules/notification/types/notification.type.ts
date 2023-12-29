import { RequestType } from '../../request/types/request-type.enum.js';

export type Notification = {
  owner: string;
  user: string;
  request?: string;
  text: string;
  type: RequestType
}
