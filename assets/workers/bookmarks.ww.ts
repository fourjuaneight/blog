import { openDB, DBSchema } from 'idb';

import { BKValues } from '../../scripts/types';

interface BookmarksDB extends DBSchema {
  [key: string]: {
    key: string;
    value: BKValues;
  };
}

const saveBookmarksToStore = async (table: string) => {
  postMessage('loading');

  // create store
  const tableName = table.toLowerCase();
  const store = await openDB<BookmarksDB>(`bookmarks`, 1, {
    upgrade(db) {
      db.createObjectStore(tableName, {
        keyPath: 'id',
      });
    },
  });
  // get bookmarks
  const response = await fetch(
    `https://cleverlaziness.com/api/bookmarks/${table}`
  );
  const data: BKValues[] = await response.json();

  // add bookmarks to store
  const storeUpdate = data.map(bookmark => store.put(tableName, bookmark));
  await Promise.all(storeUpdate);

  postMessage('loaded');
};

onmessage = evt => {
  saveBookmarksToStore(evt.data);
};
