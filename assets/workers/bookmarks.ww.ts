import { openDB, DBSchema } from 'idb';

import { BKValues } from '../../scripts/types';

interface BookmarksDB extends DBSchema {
  [key: string]: {
    key: string;
    value: BKValues;
  };
}

const saveBookmarksToStore = async (tableName: string) => {
  postMessage('loading');

  // create store
  const db = await openDB<BookmarksDB>(`bk-${tableName}`, 1, {
    upgrade(db) {
      db.createObjectStore(tableName, {
        keyPath: 'id',
      });
    },
  });
  // get bookmarks
  const response = await fetch(
    `https://cleverlaziness.com/api/bookmarks/${tableName}`
  );
  const data: BKValues[] = await response.json();

  // add bookmarks to store
  const storeUpdate = data.map(bookmark =>
    db.put(tableName, bookmark, bookmark.id)
  );
  await Promise.all(storeUpdate);

  postMessage('loaded');
};

onmessage = evt => {
  saveBookmarksToStore(evt.data);
};
