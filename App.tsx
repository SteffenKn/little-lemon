import {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useFonts} from 'expo-font';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as StateProvider, useSelector} from 'react-redux';

import {store} from '@utils';
import {GeneralState} from '@types';
import {OnboardingScreen, ProfileScreen, SplashScreen} from '@screens';

const Stack = createNativeStackNavigator();

export function Main() {
  useFonts({
    Karla: require('./assets/fonts/Karla-Regular.ttf'),
    Markazi: require('./assets/fonts/MarkaziText-Regular.ttf'),
  });
  const [loading, setLoading] = useState(true);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  const profile = useSelector<GeneralState, {name: string; email: string}>((state) => state.profile);

  if (!onboardingCompleted) {
    if (!!profile.name && !!profile.email) {
      setOnboardingCompleted(true);
    }
  }

  useEffect(() => {
    (async () => {
      const name = await AsyncStorage.getItem('name');
      const email = await AsyncStorage.getItem('email');

      const onboardingIsCompleted = !!name && !!email;

      setOnboardingCompleted(onboardingIsCompleted);
      setLoading(false);
    })();
  });

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {onboardingCompleted ? <Stack.Screen name='Profile' component={ProfileScreen} /> : <Stack.Screen name='Onboarding' component={OnboardingScreen} />}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {
  return <StateProvider store={store}>{<Main />}</StateProvider>;
}
