import {Alert} from 'react-native';
import * as FileSystem from 'expo-file-system';

import {MenuItem} from '@types';

async function loadMenu(): Promise<MenuItem[] | undefined> {
  const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');

  if (!response.ok) {
    Alert.alert('Error', 'Something went wrong getting the menu');
    return;
  }

  const data = await response.json();

  return data.menu;
}

async function loadImage(imageFileName: string) {
  const imageUrl = `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${imageFileName}?raw=true`;

  const res = await FileSystem.downloadAsync(imageUrl, FileSystem.documentDirectory + imageFileName);

  if (res.status !== 200) {
    if (res.status === 404) {
      return null;
    }

    Alert.alert(`Error (${res.status})`, `Something went wrong loading the menu images`);
    return;
  }

  return res.uri;
}

export const Client = {
  loadMenu,
  loadImage,
};
