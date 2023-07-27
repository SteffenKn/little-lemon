import {StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useFonts} from 'expo-font';

import {Onboarding} from './screens/Onboarding';

export default function App() {
  useFonts({
    Karla: require('./assets/fonts/Karla-Regular.ttf'),
    Markazi: require('./assets/fonts/MarkaziText-Regular.ttf'),
  });

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Onboarding />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F4F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
