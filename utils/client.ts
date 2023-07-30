import {Alert} from 'react-native';

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
  const response = await fetch(`https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${imageFileName}?raw=true`);

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }

    Alert.alert(`Error (${response.status})`, `Something went wrong loading the menu images`);
    return;
  }

  const data = await response.blob();
  const image = URL.createObjectURL(data);

  return image;
}

export const Client = {
  loadMenu,
  loadImage,
};
