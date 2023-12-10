import { Training } from './training.type';
import { User } from './user.interface';

export type Review = {
  id?: string;
  user: User;
  training: Training;
  rating: number;
  text: string;
  createdAt: string;
}
