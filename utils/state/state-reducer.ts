import {ActionTypes} from './action-types';
import {Action} from './state-action';
import {GeneralState} from '@types';

const initialState = {
  profile: {
    name: '',
    email: '',
  },
};

export const stateReducer = (state: GeneralState = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_NAME:
      return {
        ...state,
        profile: {
          ...state.profile,
          name: action.payload,
        },
      };
    case ActionTypes.SET_EMAIL:
      return {
        ...state,
        profile: {
          ...state.profile,
          email: action.payload,
        },
      };
    default:
      return state;
  }
};
