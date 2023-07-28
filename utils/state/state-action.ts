import {ActionTypes} from './action-types';

export const setNameState = (name: string) => ({
  type: ActionTypes.SET_NAME,
  payload: name,
});

export const setEmailState = (email: string) => ({
  type: ActionTypes.SET_EMAIL,
  payload: email,
});

export type SetNameAction = ReturnType<typeof setNameState>;
export type SetEmailAction = ReturnType<typeof setEmailState>;

export type Action = SetNameAction | SetEmailAction;
