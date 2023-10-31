import { User } from "../../user/types/user.interface.js";

export interface Subscriber {
  id?: string;
  user: User;
  text: string;
}
