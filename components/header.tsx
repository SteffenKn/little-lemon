import {Image, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export function Header() {
  const inset = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.contentContainer, {marginTop: inset.top}]}>
        <Image style={styles.icon} source={require('../img/logo.png')} resizeMode='cover' />
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
    height: 75,
    flexShrink: 0,
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    height: 48,
    width: 222,
  },
});
