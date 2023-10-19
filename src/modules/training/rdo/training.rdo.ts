import { Expose } from "class-transformer";
import { GenderPreference } from "../../../types/gender-preference.enum.js";
import { TrainingLevel } from "../../../types/training-level.enum.js";
import { WorkoutDuration } from "../../../types/workout-duration.enum.js";
import { WorkoutType } from "../../../types/workout-type.enum.js";

export default class TrainingRdo {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public backgroundImage!: string;

  @Expose()
  public trainingLevel!: TrainingLevel;

  @Expose()
  public workoutType!: WorkoutType;

  @Expose()
  public workoutDuration!: WorkoutDuration;

  @Expose()
  public price!: number;

  @Expose()
  public calories!: number;

  @Expose()
  public description!: string;

  @Expose()
  public genderPreference!: GenderPreference;

  @Expose()
  public video!: string;

  @Expose()
  public rating!: number;

  @Expose()
  public trainer!: string;

  @Expose()
  public specialOffer!: boolean;
}
