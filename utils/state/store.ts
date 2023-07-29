import {configureStore} from '@reduxjs/toolkit';

import {stateReducer} from './state-reducer';

export const store = configureStore({
  reducer: stateReducer as any,
});
