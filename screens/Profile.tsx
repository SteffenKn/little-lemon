import {Pressable, StyleSheet, ScrollView, Text, View, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-root-toast';

import {Avatar, Footer, Header, LemonCheckbox, LemonInput, LemonMaskInput} from '@components';
import {setLastName, setAvatar, setEmail, setPhone, setFirstName, setNotifications, clearState, recoverState, Validator} from '@utils';
import {GeneralState, Notifications, Profile} from '@types';

export function ProfileScreen() {
  const dispatch = useDispatch();
  const [profileChanged, setProfileChanged] = useState(false);

  const profile = useSelector<GeneralState, Profile>((state) => state.profile);
  const notifications = useSelector<GeneralState, Notifications>((state) => state.notifications);

  useEffect(() => {
    (async () => {
      const somethingChanged = await isSomethingChanged(profile, notifications);
      setProfileChanged(somethingChanged);
    })();
  }, [profile, notifications]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
      base64: true,
    });

    if (!result.canceled) {
      const image = `data:image/jpg;base64,${result.assets[0].base64!}`;
      dispatch(setAvatar(image));
    }
  };

  const logout = async () => {
    await AsyncStorage.clear();
    dispatch(clearState());
  };

  const discardChanges = async () => {
    recoverState(dispatch);
  };

  const saveChanges = async () => {
    const firstNameIsValid = Validator.validateName(profile.firstName);
    const emailIsValid = Validator.validateEmail(profile.email);

    if (!firstNameIsValid) {
      Alert.alert('First name is invalid');
      return;
    }
    if (!emailIsValid) {
      Alert.alert('Email is invalid');
      return;
    }

    if (profile.phone.length > 0) {
      const phoneIsValid = Validator.validatePhone(profile.phone);
      if (!phoneIsValid) {
        Alert.alert('Phone number is invalid');
        return;
      }
    }

    await AsyncStorage.setItem('firstName', profile.firstName);
    await AsyncStorage.setItem('lastName', profile.lastName);
    await AsyncStorage.setItem('email', profile.email);
    await AsyncStorage.setItem('phone', profile.phone);
    await AsyncStorage.setItem('notifications', JSON.stringify(notifications));

    if (profile.avatar !== null) {
      await AsyncStorage.setItem('avatar', profile.avatar);
    } else {
      await AsyncStorage.removeItem('avatar');
    }

    setProfileChanged(false);

    Toast.show('Profile was saved successfully', {position: 75});
  };

  return (
    <View style={styles.container}>
      <Header showBack={true} showAvatar={true} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.body}>
        <ScrollView keyboardDismissMode='on-drag'>
          <Text style={styles.headline}>Personal information</Text>
          <View style={styles.avatarContainer}>
            <Text style={styles.sectionHeadline}>Avatar</Text>
            <View style={styles.avatarBody}>
              <Avatar style={styles.avatar} />
              <Pressable style={styles.changeAvatarButton} onPress={pickImage}>
                <Text style={styles.changeAvatarButtonText}>Change</Text>
              </Pressable>
              <Pressable style={styles.removeAvatarButton} onPress={() => dispatch(setAvatar(null))}>
                <Text style={styles.removeAvatarButtonText}>Remove</Text>
              </Pressable>
            </View>
          </View>
          <LemonInput
            containerStyle={styles.lemonInput}
            label='First Name'
            autoComplete='given-name'
            placeholder='Enter your first name'
            value={profile.firstName}
            onChangeText={(text) => dispatch(setFirstName(text))}
          />
          <LemonInput
            containerStyle={styles.lemonInput}
            label='Last Name'
            autoComplete='family-name'
            placeholder='Enter your last name'
            value={profile.lastName}
            onChangeText={(text) => dispatch(setLastName(text))}
          />
          <LemonInput
            containerStyle={styles.lemonInput}
            label='Email'
            autoComplete='email'
            placeholder='Enter your email'
            value={profile.email}
            onChangeText={(text) => dispatch(setEmail(text))}
          />
          <LemonMaskInput
            containerStyle={styles.lemonInput}
            label='Phone Number'
            autoComplete='tel'
            placeholder='Enter your phone number'
            mask='(999) 999-9999'
            value={profile.phone}
            onChangeText={(_, raw) => dispatch(setPhone(raw))}
          />
          <View style={styles.notificationContainer}>
            <Text style={styles.headline}>Email notifications</Text>
            <LemonCheckbox label='Order statuses' value={notifications.status} onValueChange={(value) => dispatch(setNotifications({...notifications, status: value}))} />
            <LemonCheckbox label='Password changes' value={notifications.password} onValueChange={(value) => dispatch(setNotifications({...notifications, password: value}))} />
            <LemonCheckbox label='Special offers' value={notifications.offer} onValueChange={(value) => dispatch(setNotifications({...notifications, offer: value}))} />
            <LemonCheckbox label='Newsletter' value={notifications.newsletter} onValueChange={(value) => dispatch(setNotifications({...notifications, newsletter: value}))} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Footer style={styles.footer}>
        <Pressable style={[styles.button, styles.logoutButton]} onPress={logout}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </Pressable>
        <View style={styles.footerBottom}>
          <Pressable style={[styles.button, styles.discardButton]} onPress={discardChanges}>
            <Text style={styles.discardButtonText}>Discard Changes</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.saveButton, !profileChanged && styles.saveButtonDisabled]} onPress={saveChanges} disabled={!profileChanged}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </Pressable>
        </View>
      </Footer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 20,
    flexShrink: 1,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 10,
  },
  headline: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: 'Karla',
    marginBottom: 20,
  },
  avatarContainer: {
    height: 100,
    width: '100%',
  },
  avatar: {
    height: 60,
    width: 60,
    marginRight: 20,
    borderRadius: 30,
  },
  avatarBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeAvatarButton: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#495E57',
    borderWidth: 1,
    borderColor: '#495E57',
  },
  removeAvatarButton: {
    marginLeft: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#495E57',
    borderRadius: 5,
  },
  changeAvatarButtonText: {
    fontFamily: 'Karla',
    fontSize: 16,
    color: 'white',
  },
  removeAvatarButtonText: {
    fontFamily: 'Karla',
    fontSize: 16,
    color: '#333333',
  },
  lemonInput: {
    paddingHorizontal: 0,
  },
  sectionHeadline: {
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 10,
    fontFamily: 'Karla',
  },
  notificationContainer: {},
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 10,
    fontFamily: 'Karla',
  },
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#495E57',
    fontSize: 16,
    fontFamily: 'Karla',
  },
  footer: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#F1F4F7',
  },
  footerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 7,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Karla',
    fontSize: 16,
  },
  logoutButton: {
    width: '90%',
    backgroundColor: '#F4CE14',
    borderColor: '#DDAF53',
  },
  logoutButtonText: {
    fontFamily: 'Karla-Bold',
    fontSize: 16,
    color: '#333333',
  },
  discardButton: {
    borderColor: '#495E57',
  },
  discardButtonText: {
    color: '#333333',
  },
  saveButton: {
    backgroundColor: '#495E57',
    borderColor: '#495E57',
  },
  saveButtonText: {
    color: 'white',
  },
  saveButtonDisabled: {
    opacity: 0.3,
  },
});

async function isSomethingChanged(profile: Profile, notifications: Notifications) {
  const storedFirstName = await AsyncStorage.getItem('firstName');
  const storedLastName = await AsyncStorage.getItem('lastName');
  const storedEmail = await AsyncStorage.getItem('email');
  const storedPhone = await AsyncStorage.getItem('phone');
  const storedAvatar = await AsyncStorage.getItem('avatar');
  const storedNotifications = await AsyncStorage.getItem('notifications');

  const firstNameChanged = (!!storedFirstName || !!profile.firstName) && storedFirstName !== profile.firstName;
  const lastNameChanged = (!!storedLastName || !!profile.lastName) && storedLastName !== profile.lastName;
  const emailChanged = (!!storedEmail || !!profile.email) && storedEmail !== profile.email;
  const phoneChanged = (!!storedPhone || !!profile.phone) && storedPhone !== profile.phone;
  const avatarChanged = (!!storedAvatar || !!profile.avatar) && storedAvatar !== profile.avatar;
  const notificationsChanged = !!storedNotifications && storedNotifications !== JSON.stringify(notifications);

  const somethingIsChanged = firstNameChanged || lastNameChanged || emailChanged || phoneChanged || avatarChanged || notificationsChanged;

  return somethingIsChanged;
}
