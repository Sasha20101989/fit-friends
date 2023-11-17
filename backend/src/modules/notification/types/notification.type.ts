import { RequestType } from '../../request/types/request-type.enum.js';

export type Notification = {
  user?: string;
  text: string;
  type: RequestType
}
