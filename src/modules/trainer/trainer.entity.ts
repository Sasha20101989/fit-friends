import typegoose, { defaultClasses } from '@typegoose/typegoose';
import bcrypt from 'bcrypt';

import type { Trainer } from './types/trainer.interface.js';

import { Role } from '../../types/role.enum.js';
import { Gender } from '../../types/gender.enum.js';
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
  public role: Role;

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
    this.role = trainerData.role;
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

export const TrainerModel = getModelForClass(TrainerEntity);
