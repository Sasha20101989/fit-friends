import { BaseUser } from './base-user.type';
import { DynamicTrainerProperties } from './dynamic.properties';

export interface Trainer extends BaseUser, DynamicTrainerProperties {}
