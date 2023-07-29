import {Text, View} from 'react-native';

import {Header} from '@components';

export function HomeScreen() {
  return (
    <View>
      <Header showAvatar={true} />
      <Text>Home</Text>
    </View>
  );
}
