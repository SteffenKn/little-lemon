import {useEffect, useState} from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useFonts} from 'expo-font';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as StateProvider, useDispatch, useSelector} from 'react-redux';

import {store, recoverState} from '@utils';
import {GeneralState, Profile} from '@types';
import {HomeScreen, OnboardingScreen, ProfileScreen, SplashScreen} from '@screens';

const Stack = createNativeStackNavigator();

export function Main() {
  useFonts({
    Karla: require('./assets/fonts/Karla/Karla-Regular.ttf'),
    'Karla-Bold': require('./assets/fonts/Karla/Karla-Bold.ttf'),
    Markazi: require('./assets/fonts/MarkaziText/MarkaziText-Regular.ttf'),
  });
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const onboardingCompleted = useSelector<GeneralState, boolean>((state) => state.onboardingCompleted);

  useEffect(() => {
    (async () => {
      await recoverState(dispatch);
      setLoading(false);
    })();
  }, []);

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
          {onboardingCompleted ? (
            <>
              <Stack.Screen name='Home' component={HomeScreen} />
              <Stack.Screen name='Profile' component={ProfileScreen} />
            </>
          ) : (
            <Stack.Screen name='Onboarding' component={OnboardingScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {
  return <StateProvider store={store}>{<Main />}</StateProvider>;
}
