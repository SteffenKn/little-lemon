import {View, StyleSheet, Text, TextInput, Pressable} from 'react-native';

import {Header, Footer} from '../components';
import {useState} from 'react';
import {validateEmail, validateName} from '../utils';

export function Onboarding() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const nameIsValid = validateName(name);
  const emailIsValid = validateEmail(email);
  const doneButtonDisabled = !nameIsValid || !emailIsValid;

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput style={styles.input} autoComplete='name' placeholder='Enter your first name' placeholderTextColor={placeHolderTextColor} value={name} onChangeText={setName} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput style={styles.input} autoComplete='name' placeholder='Enter your email' placeholderTextColor={placeHolderTextColor} value={email} onChangeText={setEmail} />
        </View>
      </View>
      <Footer style={styles.footer}>
        <Pressable
          style={[styles.doneButton, doneButtonDisabled && styles.doneButtonDisabled]}
          disabled={doneButtonDisabled}
          onPress={() => {
            console.log(`Name: ${nameIsValid} | Email: ${emailIsValid}`);
          }}
        >
          <Text style={styles.doneButtonText}>Next</Text>
        </Pressable>
      </Footer>
    </View>
  );
}

const placeHolderTextColor = '#505050';

// TODO: Apply correct fonts
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
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 10,
    fontFamily: 'Karla',
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#495E57',
    fontSize: 16,
    fontFamily: 'Karla',
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
