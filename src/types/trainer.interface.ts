import type { BaseUser } from './base-user.type.js';
import { Role } from './role.enum.js';

export interface Trainer extends BaseUser {
  role: Role;
  certificate: string;
  trainerAchievements?: string;
  personalTraining: boolean;
}
