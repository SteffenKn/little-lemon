import * as SQLite from 'expo-sqlite';

import {MenuItem} from '@types';

const db = SQLite.openDatabase('little_lemon');

async function createTable() {
  return new Promise<void>((resolve, reject) => {
    db.transaction(
      (tx) => {
        // tx.executeSql('drop table if exists menu');
        tx.executeSql('create table if not exists menu (id integer primary key not null, name text, price text, description text, image text, category text, imageUri text);');
      },
      reject,
      resolve,
    );
  });
}

async function getMenuItems(): Promise<Array<MenuItem>> {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menu', [], (_, {rows}) => {
        const menu = rows._array.map((item) => ({
          ...item,
          imageUri: item.imageUri ? item.imageUri : undefined,
        }));

        resolve(menu);
      });
    });
  });
}

function saveMenuItems(menuItems: Array<MenuItem>) {
  db.transaction((tx) => {
    const valuesToInsert = menuItems.map((item) => {
      return `("${item.name}", "${item.price}", "${item.description}", "${item.image}", "${item.category}")`;
    });

    tx.executeSql(`INSERT INTO menu (name, price, description, image, category) VALUES ${valuesToInsert.join(', ')}`);
  });
}

function updateImage(name: string, imageUri: string) {
  db.transaction((tx) => {
    tx.executeSql(`UPDATE menu SET imageUri = (?) WHERE name = (?)`, [imageUri, name]);
  });
}

async function filterByQueryAndCategories(query: string, activeCategories: Array<string>) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM menuitems WHERE category IN (${activeCategories.map((_) => `?`)}) AND title LIKE (?)`, [...activeCategories, `%${query}%`], (_, {rows}) => {
        resolve(rows._array);
      });
    }, reject);
  });
}

export const Database = {
  createTable,
  getMenuItems,
  saveMenuItems,
  updateImage,
  filterByQueryAndCategories,
};
