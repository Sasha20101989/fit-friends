import typegoose, { defaultClasses } from '@typegoose/typegoose';

import { createSHA256 } from '../../core/helpers/common.js';

import type { Trainer } from '../../types/trainer.interface.js';

import { Role } from '../../types/role.enum.js';
import { Gender } from '../../types/gender.enum..js';
import { Location } from '../../types/location.enum.js';
import { TrainingLevel } from '../../types/training-level.enum.js';
import { WorkoutType } from '../../types/workout-type.enum.js';
import CreateTrainerDto from './dto/create-trainer.dto.js';


const { prop, modelOptions, getModelForClass } = typegoose;

export interface TrainerEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  },
  options: {
    allowMixed: 0
  }
})

export class TrainerEntity extends defaultClasses.TimeStamps implements Trainer {
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
  public role!: Role.Trainer;

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

  @prop({ required: true })
  public certificate: string;

  @prop({ required: true })
  public trainerAchievements?: string;

  @prop({ required: true })
  public personalTraining: boolean;

  constructor(trainerData: CreateTrainerDto) {
    super();

    this.name = trainerData.name;
    this.email = trainerData.email;
    this.avatar = trainerData.avatar;
    this.gender = trainerData.gender;
    this.birthDate = trainerData.birthDate;
    this.description = trainerData.description;
    this.location = trainerData.location;
    this.backgroundImage = trainerData.backgroundImage;
    this.trainingLevel = trainerData.trainingLevel;
    this.workoutTypes = trainerData.workoutTypes;
    this.certificate = trainerData.certificate;
    this.trainerAchievements = trainerData.trainerAchievements;
    this.personalTraining = trainerData.personalTraining;
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

export const TrainerModel = getModelForClass(TrainerEntity);
