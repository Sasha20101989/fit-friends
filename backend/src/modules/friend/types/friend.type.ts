import { User } from '../../user/types/user.interface.js';

export type Friend = {
  user: User;
  friends: User[];
}
