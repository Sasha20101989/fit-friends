import { BaseUser } from './base-user.type';
import { DynamicUserProperties } from './dynamic.properties';

export interface User extends BaseUser, DynamicUserProperties {}
