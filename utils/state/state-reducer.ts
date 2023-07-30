import {GeneralState} from '@types';

import {ActionTypes} from './action-types';
import {initialState} from './initial-state';
import {Reducer} from 'redux';
import {PayloadAction} from '@reduxjs/toolkit';

export const stateReducer: Reducer<GeneralState, PayloadAction<any>> = (state: GeneralState = initialState, action: PayloadAction<any>) => {
  switch (action.type) {
    case ActionTypes.CLEAR_STATE:
      return initialState;
    case ActionTypes.SET_STATE:
      return action.payload;
    case ActionTypes.SET_ONBOARDING_COMPLETED:
      return {
        ...state,
        onboardingCompleted: action.payload,
      };
    case ActionTypes.SET_FIRST_NAME:
      return {
        ...state,
        profile: {
          ...state.profile,
          firstName: action.payload,
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
    case ActionTypes.SET_LAST_NAME:
      return {
        ...state,
        profile: {
          ...state.profile,
          lastName: action.payload,
        },
      };
    case ActionTypes.SET_AVATAR:
      return {
        ...state,
        profile: {
          ...state.profile,
          avatar: action.payload,
        },
      };
    case ActionTypes.SET_PHONE:
      return {
        ...state,
        profile: {
          ...state.profile,
          phone: action.payload,
        },
      };
    case ActionTypes.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case ActionTypes.SET_MENU_LIST:
      return {
        ...state,
        menu: {
          ...state.menu,
          menuList: action.payload,
        },
      };
    case ActionTypes.SET_CATEGORY_FILTER:
      return {
        ...state,
        menu: {
          ...state.menu,
          categoryFilter: action.payload,
        },
      };
    case ActionTypes.SET_MENU_QUERY:
      return {
        ...state,
        menu: {
          ...state.menu,
          query: action.payload,
        },
      };
    default:
      return state;
  }
};
