import {Notifications} from './notifications';
import {Profile} from './profile';

export type GeneralState = {
  profile: Profile;
  notifications: Notifications;
  onboardingCompleted: boolean;
};
