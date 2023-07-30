import {useCallback, useMemo, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Image} from 'expo-image';
import {useDispatch} from 'react-redux';
import debounce from 'lodash.debounce';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import {setMenuQuery} from '@utils';

export function HeroBanner() {
  const dispatch = useDispatch();

  const [query, setQuery] = useState('');

  const lookup = useCallback((text: string) => {
    dispatch(setMenuQuery(text));
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text: string) => {
    setQuery(text);
    debouncedLookup(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Little Lemon</Text>
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.subHeadline}>Chicago</Text>
          <Text style={styles.description}>We are a family owned Mediterranean restaurant focuesed on traditional recipes served with a modern twist.</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../img/hero.png')} style={styles.image} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={query} onChangeText={handleSearchChange} placeholder='Search for dish' placeholderTextColor='#505050' />
        <MaterialCommunityIcons name='magnify' size={24} style={styles.searchIcon} color='black' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#495E57',
    flexGrow: 0,
  },
  headline: {
    fontFamily: 'Markazi',
    fontSize: 48,
    color: '#F4CE14',
    lineHeight: 46,
    marginBottom: -10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  textContainer: {
    width: '60%',
  },
  subHeadline: {
    fontFamily: 'Markazi',
    fontSize: 36,
    color: 'white',
    marginBottom: 10,
  },
  description: {
    fontFamily: 'Karla',
    color: 'white',
    fontSize: 16,
  },
  imageContainer: {
    width: '30%',
  },
  image: {
    width: '100%',
    height: 125,
    borderRadius: 10,
  },
  inputContainer: {
    height: 40,
  },
  input: {
    height: '100%',
    width: '100%',
    backgroundColor: '#EDEFEF',
    fontSize: 18,
    fontFamily: 'Karla',
    borderRadius: 10,
    paddingRight: 15,
    paddingLeft: 45,
  },
  searchIcon: {
    position: 'absolute',
    top: '50%',
    left: 10,
    transform: [{translateY: -12}],
  },
});
