import { User } from "./user.interface.js";

export interface Subscriber {
  id?: string;
  user: User;
  text: string;
}
