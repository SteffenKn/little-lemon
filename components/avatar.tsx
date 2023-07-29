import React, {useEffect} from 'react';
import {Image, StyleSheet, View, ViewStyle} from 'react-native';

import {AvatarMock} from './avatar-mock';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {GeneralState} from '../types/general-state';

type Props = {
  style: ViewStyle;
};

export function Avatar({style}: Props) {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [image, setImage] = React.useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const firstName = await AsyncStorage.getItem('firstName');
      const lastName = await AsyncStorage.getItem('lastName');
      const image = await AsyncStorage.getItem('avatar');

      if (firstName) setFirstName(firstName);
      if (lastName) setLastName(lastName);
      setImage(image);
    })();
  }, []);

  const profile = useSelector((state: GeneralState) => state.profile);
  if (profile) {
    if (profile.firstName && profile.firstName !== firstName) setFirstName(profile.firstName);
    if (profile.lastName && profile.lastName !== lastName) setLastName(profile.lastName);
    if (profile.avatar !== undefined && profile.avatar !== image) setImage(profile.avatar);
  }

  return (
    <View style={[styles.avatarContainer, style]}>
      {image ? <Image style={styles.avatar} source={{uri: image}} resizeMode='cover' /> : <AvatarMock firstName={firstName} lastName={lastName} />}
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    borderRadius: 10000,
    border: 1,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
});
