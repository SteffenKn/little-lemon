import {useEffect, useState} from 'react';
import {Alert, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import {GeneralState, MenuItem} from '@types';
import {Database, useUpdateEffect} from '@utils';

type Props = {
  categories: string[];
  menu: MenuItem[];
  isLoadingImages: boolean;
};

export function MenuList({menu, isLoadingImages, categories}: Props) {
  const [menuToDisplay, setMenuToDisplay] = useState<MenuItem[]>([]);

  const selectedCategories = useSelector<GeneralState, string[]>((state) => state.menu.categoryFilter);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      return;
    }

    setMenuToDisplay(menu);
  }, [menu]);

  useUpdateEffect(() => {
    (async () => {
      try {
        const categoriesToFilter = selectedCategories.length > 0 ? selectedCategories : categories;

        const menuItems = await Database.filterByQueryAndCategories('', categoriesToFilter);

        setMenuToDisplay(menuItems);
      } catch (error) {
        Alert.alert(error.message);
      }
    })();
  }, [selectedCategories]);

  return (
    <FlatList style={styles.list} data={menuToDisplay} renderItem={({item}) => <MenuEntry item={item} isLoadingImages={isLoadingImages} />} keyExtractor={(item) => item.name} />
  );
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
});

type MenuEntryProps = {
  item: MenuItem;
  isLoadingImages: boolean;
};

function MenuEntry({item, isLoadingImages}: MenuEntryProps) {
  return (
    <View style={menuEntryStyles.container}>
      <View style={menuEntryStyles.textContainer}>
        <Text style={menuEntryStyles.name}>{item.name}</Text>
        <Text style={menuEntryStyles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={menuEntryStyles.price}>${item.price}</Text>
      </View>
      <View style={menuEntryStyles.imageContainer}>
        {item.imageUri != null ? (
          <Image style={menuEntryStyles.image} source={{uri: item.imageUri}} resizeMode='cover' />
        ) : isLoadingImages ? (
          <Text style={menuEntryStyles.loadingText}>Loading...</Text>
        ) : (
          <Image style={menuEntryStyles.image} source={require('../img/placeholder.png')} resizeMode='cover' />
        )}
      </View>
    </View>
  );
}

const menuEntryStyles = StyleSheet.create({
  container: {
    height: 150,
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    color: '#333333',
  },
  textContainer: {
    flexShrink: 1,
    flexGrow: 1,
    marginRight: 20,
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: 'Karla',
    fontSize: 22,
  },
  description: {
    height: 38,
    fontFamily: 'Karla',
    fontSize: 16,
    color: '#333333',
    overflow: 'hidden',
  },
  price: {
    fontFamily: 'Karla',
    fontSize: 22,
  },
  imageContainer: {
    width: 100,
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Karla',
  },
});
