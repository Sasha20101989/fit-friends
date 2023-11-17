import type { Training } from '../../training/types/training.type.js';
import { User } from '../../user/types/user.interface.js';

export type Review = {
  user?: User;
  training?: Training;
  rating: number;
  text: string;
}
