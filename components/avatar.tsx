import {Image, StyleSheet, View, ViewStyle} from 'react-native';
import {useSelector} from 'react-redux';

import {AvatarMock} from './avatar-mock';
import {GeneralState} from '../types/general-state';

type Props = {
  style: ViewStyle;
};

export function Avatar({style}: Props) {
  const {avatar, firstName, lastName} = useSelector((state: GeneralState) => state.profile);

  return (
    <View style={[styles.avatarContainer, style]}>
      {avatar ? <Image style={styles.avatar} source={{uri: avatar}} resizeMode='cover' /> : <AvatarMock firstName={firstName} lastName={lastName} />}
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
