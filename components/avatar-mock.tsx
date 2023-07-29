import {StyleSheet, Text, View} from 'react-native';

type Props = {
  firstName?: string;
  lastName?: string;
};

export function AvatarMock({firstName, lastName}: Props) {
  let initials;
  if (firstName && lastName) {
    initials = firstName[0] + lastName[0];
  } else if (firstName) {
    initials = firstName[0];
  } else {
    initials = 'XX';
  }

  return (
    <View style={styles.avatarContainer}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    flex: 1,
    backgroundColor: '#495E57',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontFamily: 'Karla',
    fontSize: 24,
  },
});
