import {StyleSheet, View} from 'react-native';
import {Image} from 'expo-image';

export function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={require('../img/logo.png')} resizeMode='cover' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F4F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 48,
    width: 222,
  },
});
