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

async function getMenuItems(): Promise<MenuItem[]> {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menu', [], (_, {rows}) => {
        resolve(rows._array);
      });
    });
  });
}

function saveMenuItems(menuItems: MenuItem[]) {
  db.transaction((tx) => {
    const valuesToInsert = menuItems.map((item) => {
      return `("${item.name}", "${item.price}", "${item.description}", "${item.image}", "${item.category}", ${item.imageUri ? `"${item.imageUri}"` : null})`;
    });

    tx.executeSql(`INSERT INTO menu (name, price, description, image, category, imageUri) VALUES ${valuesToInsert.join(', ')}`);
  });
}

async function filterByQueryAndCategories(query: string, activeCategories: string[]): Promise<MenuItem[]> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM menu WHERE category IN (${activeCategories.map((_) => `?`)}) AND name LIKE (?)`, [...activeCategories, `%${query}%`], (_, {rows}) => {
        resolve(rows._array);
      });
    }, reject);
  });
}

export const Database = {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
};
