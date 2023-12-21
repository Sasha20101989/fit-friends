import { BaseUser } from './base-user.type.js';
import { Role } from './role.enum.js';

export interface Trainer extends BaseUser {
  certificate: string;
  trainerAchievements?: string;
  personalTraining: boolean;
}
