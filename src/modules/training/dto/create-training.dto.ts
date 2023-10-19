import { IsNotEmpty } from 'class-validator';
import { GenderPreference } from '../../../types/gender-preference.enum.js';
import { TrainingLevel } from '../../../types/training-level.enum.js';
import { WorkoutDuration } from '../../../types/workout-duration.enum.js';
import { WorkoutType } from '../../../types/workout-type.enum.js';

export default class CreateTrainingDto{
  @IsNotEmpty({ message: 'Name is required' })
  public name!: string;

  @IsNotEmpty({ message: 'BackgroundImage is required' })
  public backgroundImage!: string;

  @IsNotEmpty({ message: 'TrainingLevel is required' })
  public trainingLevel!: TrainingLevel;

  @IsNotEmpty({ message: 'Workout Type is required' })
  public workoutType!: WorkoutType;

  @IsNotEmpty({ message: 'Workout Duration is required' })
  public workoutDuration!: WorkoutDuration;

  @IsNotEmpty({ message: 'Price is required' })
  public price!: number;

  @IsNotEmpty({ message: 'Calories is required' })
  public calories!: number;

  @IsNotEmpty({ message: 'Description is required' })
  public description!: string;

  @IsNotEmpty({ message: 'Gender Preference is required' })
  public genderPreference!: GenderPreference;

  @IsNotEmpty({ message: 'Video is required' })
  public video!: string;

  @IsNotEmpty({ message: 'Trainer is required' })
  public trainer!: string;

  @IsNotEmpty({ message: 'SpecialOffer is required' })
  public specialOffer!: boolean;
}

