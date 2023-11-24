import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../const';

export const redirectToRoute1 = createAction<AppRoute | string>('route/redirectToRoute');
