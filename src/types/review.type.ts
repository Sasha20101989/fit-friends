import type { User } from './user.interface.js';
import { Training } from './training.type.js';

export type Review = {
  author: User;
  training: Training;
  rating: number;
  text: string;
}
