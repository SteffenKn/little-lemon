import {GeneralState} from '@types';

export const initialState: GeneralState = {
  profile: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatar: null,
  },
  notifications: {
    status: false,
    password: false,
    offer: false,
    newsletter: false,
  },
  onboardingCompleted: false,
  menu: {
    categoryFilter: [],
    menuList: [],
    query: '',
  },
};
