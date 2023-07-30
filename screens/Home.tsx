import {StyleSheet, Text, View} from 'react-native';

import {Header, HeroBanner, MenuView} from '@components';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header showAvatar={true} />
      <HeroBanner />
      <Text style={styles.headline}>ORDER FOR DELIVERY!</Text>
      <MenuView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headline: {
    fontSize: 20,
    fontFamily: 'Karla-Bold',
    fontWeight: 'bold',
    color: '#1F2937',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
});
