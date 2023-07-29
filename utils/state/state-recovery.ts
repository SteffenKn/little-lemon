import AsyncStorage from '@react-native-async-storage/async-storage';
import {AnyAction, Dispatch} from '@reduxjs/toolkit';

import {GeneralState} from '@types';

import {setState} from './state-action';

export async function recoverState(dispatch: Dispatch<AnyAction>) {
  const firstName = await AsyncStorage.getItem('firstName');
  const lastName = await AsyncStorage.getItem('lastName');
  const email = await AsyncStorage.getItem('email');
  const phone = await AsyncStorage.getItem('phone');
  const avatar = await AsyncStorage.getItem('avatar');
  const notifications = await AsyncStorage.getItem('notifications');
  const onboardingCompleted = !!firstName && !!email;

  const state: GeneralState = {
    profile: {
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
      phone: phone || '',
      avatar: avatar || null,
    },
    notifications: notifications
      ? JSON.parse(notifications)
      : {
          status: false,
          password: false,
          offer: false,
          newsletter: false,
        },
    onboardingCompleted: onboardingCompleted,
  };

  dispatch(setState(state));
}
