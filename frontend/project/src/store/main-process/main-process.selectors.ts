import { NameSpace } from '../../const';
import { Gender } from '../../types/gender.enum.js';
import { Location } from '../../types/location.enum';
import { Page } from '../../types/page.enum.js';
import { State } from '../../types/state';
import { TrainingLevel } from '../../types/training-level.enum';
import { WorkoutDuration } from '../../types/workout-duration.enum';

export const getLevel = (state: State): TrainingLevel => state[NameSpace.Main].level;
export const getDuration = (state: State): WorkoutDuration => state[NameSpace.Main].duration;
export const getFile = (state: State): string => state[NameSpace.Main].file;
export const getLocation = (state: State): Location | null => state[NameSpace.Main].location;
export const getGender = (state: State): Gender | null => state[NameSpace.Main].gender;
export const getDescription = (state: State): string | undefined => state[NameSpace.Main].description;
export const getName = (state: State): string => state[NameSpace.Main].name;
export const getAvatar = (state: State): string | undefined => state[NameSpace.Main].avatar;
export const getSelectedPage = (state: State): Page | undefined => state[NameSpace.Main].selectedPage;
export const getError = (state: State): string | undefined => state[NameSpace.Main].error;
