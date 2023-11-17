import type { Training } from '../../training/types/training.type.js';

export type UserBalance = {
  training?: Training;
  availableQuantity: number;
}
