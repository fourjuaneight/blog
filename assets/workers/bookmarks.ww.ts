import { openDB, DBSchema } from 'idb';
import { addDays, compareAsc, getUnixTime } from 'date-fns';

import { BKValues } from '../../scripts/types';

interface TableValues {
  name: string;
  version: number;
  new: boolean;
}

interface MessageValues {
  dbVersion: number;
  table: TableValues;
}

interface BookmarksDB extends DBSchema {
  [key: string]: {
    key: string;
    value: BKValues;
  };
}

const getBookmarksFromStore = async (
  tableName: string,
  isExpired: boolean,
  dbVersion: number
): Promise<void> => {
  // open store and get bookmakrs
  const store = await openDB<BookmarksDB>('Bookmarks');
  const bookmarks = await store.getAll(tableName);

  // send bookmarks to main thread
  postMessage({ bookmarks, isExpired, dbVersion });
};

const saveBookmarksToStore = async (dbVersion: number, table: TableValues) => {
  // determine if bookmarks are expired
  const currentTime = new Date();
  const versionTime = addDays(table.version, 1);
  const difference = compareAsc(currentTime, versionTime);
  const isExpired = table.new ? true : difference === 1;
  const newDBVersion = isExpired ? dbVersion + 1 : dbVersion;

  // create new store
  const store = await openDB<BookmarksDB>(`Bookmarks`, newDBVersion, {
    upgrade(db, dbVersion, newVersion) {
      db.createObjectStore(table.name, {
        keyPath: 'id',
      });
    },
  });

  if (isExpired) {
    // get bookmarks
    const response = await fetch(
      `https://cleverlaziness.com/api/bookmarks/${table.name}`
    );
    const data: BKValues[] = await response.json();

    // add bookmarks to store
    const storeUpdate = data.map(bookmark => store.put(table.name, bookmark));
    await Promise.all(storeUpdate);
  }

  // get bookmarks and send to main thread
  await getBookmarksFromStore(table.name, isExpired, newDBVersion);
};

onmessage = (evt: MessageEvent<MessageValues>) => {
  saveBookmarksToStore(evt.data.dbVersion, evt.data.table);
};
