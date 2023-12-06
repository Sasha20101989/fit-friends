import { NameSpace } from '../../const';
import { Gender } from '../../types/gender.enum.js';
import { Location } from '../../types/location.enum';
import { Role } from '../../types/role.enum';
import { State } from '../../types/state';
import { TrainingLevel } from '../../types/training-level.enum';
import { WorkoutDuration } from '../../types/workout-duration.enum';
import { WorkoutType } from '../../types/workout-type.enum';

export const getSpecializations = (state: State): WorkoutType[] => state[NameSpace.Main].specializations;
export const getLevel = (state: State): TrainingLevel => state[NameSpace.Main].level;
export const getDuration = (state: State): WorkoutDuration => state[NameSpace.Main].duration;
export const getFile = (state: State): string => state[NameSpace.Main].file;
export const getRole = (state: State): Role => state[NameSpace.Main].userRole;
export const getUserId = (state: State): string => state[NameSpace.Main].userId;
export const getLocation = (state: State): Location | null => state[NameSpace.Main].location;
export const getGender = (state: State): Gender | null => state[NameSpace.Main].gender;
export const getReadiessToWorkout = (state: State): boolean => state[NameSpace.Main].readiessToWorkout;
