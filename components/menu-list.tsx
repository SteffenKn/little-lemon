import {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';

import {Client} from '@utils';
import {MenuItem} from '@types';

export function MenuList() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingImages, setIsLoadingImages] = useState(true);

  useEffect(() => {
    (async () => {
      const loadedMenu = await Client.loadMenu();

      if (!loadedMenu) {
        return;
      }

      setMenu(loadedMenu);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!isLoadingImages) setIsLoadingImages(true);

      const menuEntriesWithoutImage = menu.filter((item) => item.imageData === undefined);

      if (menuEntriesWithoutImage.length === 0) {
        return;
      }

      const images = await Promise.all(
        menuEntriesWithoutImage.map(async (item) => {
          const image = await Client.loadImage(item.image);
          return image;
        }),
      );

      const menuWithImages = menuEntriesWithoutImage.map((item, index) => {
        return {
          ...item,
          imageData: images[index],
        };
      });

      const newMenu = menu.map((item) => {
        const itemWithImage = menuWithImages.find((i) => i.name === item.name);
        if (itemWithImage) {
          return itemWithImage;
        }

        return item;
      });

      setMenu(newMenu);

      setIsLoadingImages(false);
    })();
  }, [menu]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return <FlatList data={menu} renderItem={({item}) => <MenuEntry item={item} isLoadingImages={isLoadingImages} />} keyExtractor={(item) => item.name} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontFamily: 'Karla',
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
        {item.imageData ? (
          <Image style={menuEntryStyles.image} source={{uri: item.imageData}} resizeMode='cover' />
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
