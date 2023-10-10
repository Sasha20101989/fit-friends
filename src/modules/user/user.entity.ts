import typegoose, { defaultClasses } from '@typegoose/typegoose';

import { createSHA256 } from '../../core/helpers/common.js';

import type { User } from '../../types/user.interface.js';

import { Role } from '../../types/role.enum.js';
import { WorkoutDuration } from '../../types/workout-duration.enum.js';
import { Gender } from '../../types/gender.enum..js';
import { Location } from '../../types/location.enum.js';
import { TrainingLevel } from '../../types/training-level.enum.js';
import { WorkoutType } from '../../types/workout-type.enum.js';
import { CALORIES_CONSTRAINTS, PASSWORD_CONSTRAINTS, USERNAME_CONSTRAINTS } from './user.const.js';
import CreateUserDto from './dto/create-user.dto.js';

const { prop, modelOptions, getModelForClass } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, minlength: USERNAME_CONSTRAINTS.MIN_LENGTH, maxlength: USERNAME_CONSTRAINTS.MAX_LENGTH})
  public name: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false })
  public avatar?: string;

  @prop({ required: true, minlength: PASSWORD_CONSTRAINTS.MIN_LENGTH, maxlength: PASSWORD_CONSTRAINTS.MAX_LENGTH })
  private password?: string;

  @prop({ required: true, enum: Gender })
  public gender: Gender;

  @prop({ required: false })
  public birthDate?: string;

  @prop({ required: true, enum: Role, default: Role.User })
  public role!: Role.User;

  @prop({ required: false, trim: true })
  public description?: string;

  @prop({ required: true, enum: Location })
  public location: Location;

  @prop({ required: true })
  public backgroundImage: string;

  @prop({ required: true, enum: TrainingLevel })
  public trainingLevel: TrainingLevel;

  @prop({ required: true, type: String, enum: WorkoutType })
  public workoutTypes: WorkoutType[];

  @prop({ required: true, enum: WorkoutDuration })
  public workoutDuration: WorkoutDuration;

  @prop({ required: true, min: CALORIES_CONSTRAINTS.MIN_TO_BURN, max: CALORIES_CONSTRAINTS.MAX_TO_BURN })
  public caloriesToBurn: number;

  @prop({ required: true, min: CALORIES_CONSTRAINTS.MIN_TO_SPEND, max: CALORIES_CONSTRAINTS.MAX_TO_SPEND })
  public caloriesToSpend: number;

  @prop({ required: true })
  public readinessForWorkout: boolean;

  @prop({default: 0})
  public traningCount!: number;

  @prop()
  public traningIds!: string[];

  constructor(userData: CreateUserDto) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatar = userData.avatar;
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
    this.traningCount = userData.traningCount;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
