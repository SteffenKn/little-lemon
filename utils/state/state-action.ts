import {GeneralState, MenuItem, Notifications} from '@types';

import {ActionTypes} from './action-types';

export const setState = (state: GeneralState | null) => ({
  type: ActionTypes.SET_STATE,
  payload: state,
});

export const clearState = () => ({
  type: ActionTypes.CLEAR_STATE,
  payload: null,
});

export const setOnboardingCompleted = (completed: boolean | null) => ({
  type: ActionTypes.SET_ONBOARDING_COMPLETED,
  payload: completed,
});

export const setFirstName = (firstName: string) => ({
  type: ActionTypes.SET_FIRST_NAME,
  payload: firstName,
});

export const setEmail = (email: string) => ({
  type: ActionTypes.SET_EMAIL,
  payload: email,
});

export const setLastName = (lastName: string) => ({
  type: ActionTypes.SET_LAST_NAME,
  payload: lastName,
});

export const setAvatar = (avatar: string | null) => ({
  type: ActionTypes.SET_AVATAR,
  payload: avatar,
});

export const setPhone = (phone: string | null) => ({
  type: ActionTypes.SET_PHONE,
  payload: phone,
});

export const setNotifications = (notifications: Notifications | null) => ({
  type: ActionTypes.SET_NOTIFICATIONS,
  payload: notifications,
});

export const SetMenuList = (menuList: MenuItem[]) => ({
  type: ActionTypes.SET_MENU_LIST,
  payload: menuList,
});

export const setCategoryFilter = (categories: string[]) => ({
  type: ActionTypes.SET_CATEGORY_FILTER,
  payload: categories,
});

export type SetStateAction = ReturnType<typeof setState>;
export type ClearStateAction = ReturnType<typeof clearState>;
export type SetFirstNameAction = ReturnType<typeof setFirstName>;
export type SetEmailAction = ReturnType<typeof setEmail>;
export type SetLastNameAction = ReturnType<typeof setLastName>;
export type SetAvatarAction = ReturnType<typeof setAvatar>;
export type SetPhoneAction = ReturnType<typeof setPhone>;
export type SetNotificationsAction = ReturnType<typeof setNotifications>;
export type SetMenuListAction = ReturnType<typeof SetMenuList>;
export type SetCategoryFilterAction = ReturnType<typeof setCategoryFilter>;

export type Action =
  | SetStateAction
  | ClearStateAction
  | SetFirstNameAction
  | SetEmailAction
  | SetLastNameAction
  | SetAvatarAction
  | SetPhoneAction
  | SetNotificationsAction
  | SetMenuListAction
  | SetCategoryFilterAction;
