import {StyleSheet, View} from 'react-native';

import {Header, MenuList} from '@components';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header showAvatar={true} />
      <MenuList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
