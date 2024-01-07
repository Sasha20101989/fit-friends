import type { BaseUser } from '../../../types/base-user.type.js';
import { Role } from '../../../types/role.enum.js';

export interface Trainer extends BaseUser {
  role: Role;
  certificates: string[];
  trainerAchievements?: string;
  personalTraining: boolean;
}
