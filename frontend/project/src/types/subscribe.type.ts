import { Trainer } from './trainer.interface';
import { User } from './user.interface';

export type Subscribe = {
  id: string;
  user: User;
  trainer: Trainer;
}
