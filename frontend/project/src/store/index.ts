import { configureStore } from '@reduxjs/toolkit';

import { createApi } from '../services/api';
import { rootReducer } from './root-reducer';

const api = createApi();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    })
});
