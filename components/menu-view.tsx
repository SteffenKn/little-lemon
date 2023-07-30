import {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Client, Database} from '@utils';
import {MenuItem} from '@types';

import {CategoryFilter} from './category-filter';
import {MenuList} from './menu-list';

export function MenuView() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingImages, setIsLoadingImages] = useState(true);

  useEffect(() => {
    (async () => {
      await Database.createTable();
      let loadedMenu: MenuItem[] | undefined = await Database.getMenuItems();

      if (loadedMenu.length > 0) {
        setMenu(loadedMenu);
        setIsLoading(false);
        setIsLoadingImages(false);

        return;
      }

      loadedMenu = await Client.loadMenu();

      if (!loadedMenu) {
        return;
      }

      setMenu(loadedMenu);
      setIsLoading(false);

      const images = await Promise.all(
        loadedMenu.map(async (item) => {
          const image = await Client.loadImage(item.image);
          return {
            name: item.name,
            imageUri: image,
          };
        }),
      );

      loadedMenu = loadedMenu.map((item, index): MenuItem => {
        const imageUri = images.find((image) => image.name === item.name)?.imageUri;

        return {
          ...item,
          imageUri: imageUri,
        };
      });

      Database.saveMenuItems(loadedMenu);

      setMenu(loadedMenu);
      setIsLoadingImages(false);
    })();
  }, []);

  const categories = useMemo(() => {
    const categories = menu.map((item) => item.category);
    return [...new Set(categories)];
  }, [menu]);

  if (isLoading) {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <CategoryFilter categories={categories} />
      <MenuList menu={menu} isLoadingImages={isLoadingImages} categories={categories} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontFamily: 'Karla',
  },
});
