import { NameSpace } from '../../const';
import { Page } from '../../types/page.enum.js';
import { State } from '../../types/state';

export const getSelectedPage = (state: State): Page | undefined => state[NameSpace.Main].selectedPage;
export const getError = (state: State): string | undefined => state[NameSpace.Main].error;
