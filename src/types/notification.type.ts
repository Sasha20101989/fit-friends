import type { User } from "./user.interface.js";

export type Notification = {
  date: Date;
  user: User;
  text: string;
}
