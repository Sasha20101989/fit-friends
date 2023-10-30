import { NotificationType } from "./notification-type.type.js";

export type Notification = {
  user: string,
  type: NotificationType,
  text: string,
};
