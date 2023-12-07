import typegoose, { Ref, defaultClasses } from '@typegoose/typegoose';
import { GenderPreference } from '../../types/gender-preference.enum.js';
import { TrainingLevel } from '../../types/training-level.enum.js';
import { WorkoutDuration } from '../../types/workout-duration.enum.js';
import { WorkoutType } from '../../types/workout-type.enum.js';
import { TrainerEntity } from '../trainer/trainer.entity.js';

const { prop, modelOptions, getModelForClass } = typegoose;

export interface TrainingEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'trainings'
  },
  options: {
    allowMixed: 0
  }
})
export class TrainingEntity extends defaultClasses.TimeStamps {
  @prop()
  public name!: string;

  @prop()
  public backgroundImage?: string;

  @prop()
  public trainingLevel!: TrainingLevel;

  @prop()
  public workoutType!: WorkoutType;

  @prop()
  public workoutDuration!: WorkoutDuration;

  @prop()
  public price!: number;

  @prop()
  public calories!: number;

  @prop()
  public description!: string;

  @prop()
  public genderPreference!: GenderPreference;

  @prop()
  public video!: string;

  @prop({default: 0})
  public rating!: number;

  @prop({ ref: TrainerEntity, required: true })
  public trainer!: Ref<TrainerEntity>;

  @prop()
  public specialOffer!: boolean;

  public setRating(averageRating: number){
    this.rating = averageRating;
  }
}

export const TrainingModel = getModelForClass(TrainingEntity);
