import type { BaseUser } from './base-user.type.js';
import { Role } from './role.enum.js';

export interface Trainer extends BaseUser {
  role: Role.Trainer;
  certificate: string;
  trainerAchievements?: string;
  personalTraining: boolean;
}
