import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';

import {GeneralState} from '@types';
import {setCategoryFilter} from '@utils';

type Props = {
  categories: string[];
};

export function CategoryFilter({categories}: Props) {
  const dispatch = useDispatch();

  const selectedCategories = useSelector<GeneralState, string[]>((state) => state.menu.categoryFilter);

  const categoryClicked = (category: string) => {
    let newCategories = [];
    if (selectedCategories.includes(category)) {
      newCategories = selectedCategories.filter((c) => c !== category);
    } else {
      newCategories = [...selectedCategories, category];
    }

    dispatch(setCategoryFilter(newCategories));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} horizontal={true}>
      {categories.map((category) => (
        <Pressable key={category} style={[styles.category, selectedCategories.includes(category) && styles.categoryActive]} onPress={() => categoryClicked(category)}>
          <Text style={[styles.categoryText, selectedCategories.includes(category) && styles.categoryTextActive]}>{capitalizeFirstLetter(category)}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexGrow: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
  },
  category: {
    backgroundColor: '#CBD2D9',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
  },
  categoryText: {
    color: '#495E57',
    fontFamily: 'Karla-Bold',
    fontSize: 16,
  },
  categoryActive: {
    backgroundColor: '#333333',
  },
  categoryTextActive: {
    color: 'white',
  },
});
