import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AntDesign} from '@expo/vector-icons';
import {Avatar} from './avatar';
import {useEffect} from 'react';

export function Header({showBack = false, showAvatar = false}) {
  const inset = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.contentContainer, {marginTop: inset.top}]}>
        <View style={styles.left}>
          {showBack && (
            <Pressable style={[styles.backButton, styles.backButtonDisabled]} onPress={() => {}} disabled={true}>
              <AntDesign name='arrowleft' size={24} color='white' />
            </Pressable>
          )}
        </View>
        <View style={styles.center}>
          <Image style={styles.icon} source={require('../img/logo.png')} resizeMode='cover' />
        </View>
        <View style={styles.right}>{showAvatar && <Avatar style={styles.avatar} />}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#DEE3E9',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    height: 75,
    flexShrink: 0,
    justifyContent: 'center',
  },
  left: {
    flexShrink: 0,
    width: '25%',
    justifyContent: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 24,
    backgroundColor: '#495E57',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  backButtonDisabled: {
    opacity: 0.3,
  },
  center: {
    flexShrink: 0,
    width: '50%',
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    height: 48,
    width: 222,
  },
  right: {
    flexShrink: 0,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  avatar: {
    height: 60,
    width: 60,
    marginRight: 20,
    borderRadius: 30,
  },
});
