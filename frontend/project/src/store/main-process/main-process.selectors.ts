import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { TrainingLevel } from '../../types/training-level.enum';
import { WorkoutDuration } from '../../types/workout-duration.enum';
import { WorkoutType } from '../../types/workout-type.enum';

export const getSpecializations = (state: State): WorkoutType[] => state[NameSpace.Main].specializations;
export const getLevel = (state: State): TrainingLevel => state[NameSpace.Main].level;
export const getDuration = (state: State): WorkoutDuration => state[NameSpace.Main].duration;
export const getFile = (state: State): string => state[NameSpace.Main].file;
