import { NameSpace } from '../../const';
import { Role } from '../../types/role.enum';
import { State } from '../../types/state';
import { TrainingLevel } from '../../types/training-level.enum';
import { WorkoutDuration } from '../../types/workout-duration.enum';
import { WorkoutType } from '../../types/workout-type.enum';

export const getSpecializations = (state: State): WorkoutType[] => state[NameSpace.Main].specializations;
export const getLevel = (state: State): TrainingLevel => state[NameSpace.Main].level;
export const getDuration = (state: State): WorkoutDuration => state[NameSpace.Main].duration;
export const getFile = (state: State): string => state[NameSpace.Main].file;
export const getRole = (state: State): Role => state[NameSpace.Main].role;
