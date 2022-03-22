import { openDB, DBSchema } from 'idb';

import { AirtableBKResp, BKValues } from '../../scripts/types';

interface BookmarksDB extends DBSchema {
  [key: string]: {
    key: string;
    value: BKValues;
  };
}

let data: BKValues[] = [];

const getBookmarksWithOffset = async (
  table: string,
  offset?: string
): Promise<AirtableBKResp> => {
  const options: RequestInit = {
    headers: {
      Authorization: 'Bearer <AIRTABLE_TOKEN>',
      'Content-Type': 'application/json',
    },
  };
  const endpoint = `https://api.airtable.com/v0/<AIRTABLE_BOOKMARKS_ID>/${table}`;
  const url = offset ? `${endpoint}?offset=${offset}` : endpoint;

  try {
    return fetch(url, options)
      .then((response: Response) => response.json())
      .then((airtableRes: AirtableBKResp) => {
        const existingData = data || [];
        const newData =
          airtableRes.records?.map(record => {
            delete record.fields.archive;
            return { id: record.id, ...record.fields };
          }) || [];

        data = [...existingData, ...newData];

        if (airtableRes.offset) {
          return getBookmarksWithOffset(airtableRes.offset);
        }

        return airtableRes;
      });
  } catch (error) {
    throw error;
  }
};

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
  await getBookmarksWithOffset(tableName);

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
