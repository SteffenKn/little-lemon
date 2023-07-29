import {View, StyleSheet, Text, Image, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';

import {setFirstName, setEmail, Validator, setOnboardingCompleted} from '@utils';
import {Footer, Header, LemonInput} from '@components';
import {GeneralState, Profile} from '@types';

export function OnboardingScreen() {
  const dispatch = useDispatch();

  const {firstName, email} = useSelector<GeneralState, Profile>((state) => state.profile);

  const nameIsValid = Validator.validateName(firstName);
  const emailIsValid = Validator.validateEmail(email);
  const doneButtonDisabled = !nameIsValid || !emailIsValid;

  const finishOnboarding = async () => {
    if (doneButtonDisabled) {
      return;
    }

    await AsyncStorage.setItem('firstName', firstName);
    await AsyncStorage.setItem('email', email);

    dispatch(setOnboardingCompleted(true));
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <LemonInput label='First Name' autoComplete='given-name' placeholder='Enter your first name' value={firstName} onChangeText={(text) => dispatch(setFirstName(text))} />
        <LemonInput label='Email' autoComplete='email' placeholder='Enter your email' value={email} onChangeText={(text) => dispatch(setEmail(text))} />
      </View>
      <Footer style={styles.footer}>
        <Pressable style={[styles.doneButton, doneButtonDisabled && styles.doneButtonDisabled]} disabled={doneButtonDisabled} onPress={finishOnboarding}>
          <Text style={styles.doneButtonText}>Next</Text>
        </Pressable>
      </Footer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CBD2D9',
  },
  avatar: {
    height: 60,
    width: 60,
    marginRight: 20,
    borderRadius: 30,
  },
  footer: {
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F4F7',
  },
  doneButton: {
    height: 40,
    width: 100,
    alignSelf: 'flex-end',
    marginRight: 50,
    backgroundColor: '#CBD2D9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  doneButtonDisabled: {
    opacity: 0.3,
  },
  doneButtonText: {
    color: '#495E57',
    fontSize: 20,
    fontFamily: 'Karla',
  },
});
