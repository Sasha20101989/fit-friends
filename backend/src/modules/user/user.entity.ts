import typegoose, { Ref, defaultClasses } from '@typegoose/typegoose';
import bcrypt from 'bcrypt';

import { Role } from '../../types/role.enum.js';
import { WorkoutDuration } from '../../types/workout-duration.enum.js';
import { Gender } from '../../types/gender.enum.js';
import { Location } from '../../types/location.enum.js';
import { TrainingLevel } from '../../types/training-level.enum.js';
import { WorkoutType } from '../../types/workout-type.enum.js';
import CreateUserDto from './dto/create-user.dto.js';
import { BalanceEntity } from '../balance/balance.entity.js';

const { prop, modelOptions, getModelForClass } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  },
  options: {
    allowMixed: 0
  }
})

export class UserEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public name: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false })
  public avatar?: string;

  @prop({ required: true })
  private password?: string;

  @prop({ required: true, enum: Gender })
  public gender: Gender;

  @prop({ required: false })
  public birthDate?: string;

  @prop({ required: true, enum: Role, default: Role.User })
  public role: Role;

  @prop({ required: false, trim: true })
  public description?: string;

  @prop({ required: true, enum: Location })
  public location: Location;

  @prop({ required: false })
  public backgroundImage?: string;

  @prop({ required: false, enum: TrainingLevel })
  public trainingLevel: TrainingLevel;

  @prop({ required: true, type: String, enum: WorkoutType })
  public workoutTypes: WorkoutType[];

  @prop({ required: false, enum: WorkoutDuration })
  public workoutDuration: WorkoutDuration;

  @prop({ required: false })
  public caloriesToBurn: number;

  @prop({ required: false })
  public caloriesToSpend: number;

  @prop({ required: false })
  public readinessForWorkout: boolean;

  @prop({ required: false, ref: BalanceEntity })
  public balance?: Ref<BalanceEntity>[];

  constructor(userData: CreateUserDto) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.role = userData.role;
    this.gender = userData.gender;
    this.birthDate = userData.birthDate;
    this.description = userData.description;
    this.location = userData.location;
    this.backgroundImage = userData.backgroundImage;
    this.trainingLevel = userData.trainingLevel;
    this.workoutTypes = userData.workoutTypes;
    this.workoutDuration = userData.workoutDuration;
    this.caloriesToBurn = userData.caloriesToBurn;
    this.caloriesToSpend = userData.caloriesToSpend;
    this.readinessForWorkout = userData.readinessForWorkout;
  }

  public async setPassword(password: string, saltRounds: number) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    this.password = hashedPassword;
  }

  public getPassword() {
    return this.password;
  }

  public async verifyPassword(password: string) {
    if (this.password) {
      return await bcrypt.compare(password, this.password);
    }
    return false;
  }
}

export const UserModel = getModelForClass(UserEntity);
