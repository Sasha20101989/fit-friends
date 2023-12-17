import { Training } from './training.type.js';

export type UserBalance = {
  id: string;
  training: Training;
  availableQuantity: number;
}
