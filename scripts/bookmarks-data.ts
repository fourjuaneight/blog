import { promises } from 'fs';
import { resolve } from 'path';

import chalk from 'chalk';
import dotenv from 'dotenv';
import fetch from 'isomorphic-fetch';

import {
  AirtableBKResp,
  BookmarksData,
  BKFields,
  BKRecord,
  RedditFields,
  TweetFields,
  WebFields,
} from './types';

dotenv.config();

const dist = resolve(__dirname, '..', 'data');
const { writeFile } = promises;
const { AIRTABLE_BOOKMARKS_ID, AIRTABLE_TOKEN } = process.env;
// table data
const data: BookmarksData = {
  Articles: [],
  Comics: [],
  Podcasts: [],
  Reddits: [],
  Tweets: [],
  Videos: [],
};

/**
 * Get bookmarks list from Airtable.
 * Request can be recursive is there is more than 100 records.
 * @function
 * @async
 *
 * @param  {string}   table  table name
 * @param  {[string]} offset param to request remainding records
 * @return {AirtableBKResp}
 */
const getBookmarksWithOffset = (
  table: string,
  offset?: string
): Promise<AirtableBKResp> => {
  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };
  const endpoint = `https://api.airtable.com/v0/${AIRTABLE_BOOKMARKS_ID}/${table}`;
  const url = offset ? `${endpoint}?offset=${offset}` : endpoint;

  try {
    return fetch(url, options)
      .then((response: Response) => response.json())
      .then((airtableRes: AirtableBKResp) => {
        const existingData = data[table] || [];
        const newData =
          airtableRes.records?.map(record => {
            delete record.fields.archive;
            return { id: record.id, ...record.fields };
          }) || [];

        data[table] = [...existingData, ...newData];

        if (airtableRes.offset) {
          return getBookmarksWithOffset(airtableRes.offset);
        }

        return airtableRes;
      });
  } catch (error) {
    throw `${chalk.red('[ERROR]')} ${chalk.blue(
      '(getBookmarksWithOffset)'
    )} (${table.toLowerCase()}) ${error}`;
  }
};

/**
 * Save Airtable data to local JSON data file.
 * @function
 * @async
 *
 * @param  {string} table table name
 * @return {void}
 */
const saveData = async (table: string): Promise<void> => {
  const tableName = table.toLowerCase();

  try {
    await getBookmarksWithOffset(table);

    if (data[table]?.length) {
      await writeFile(
        `${dist}/bookmarks-${tableName}.json`,
        JSON.stringify(data[table], null, 2)
      );

      console.info(
        chalk.green('[SUCCESS]'),
        `data saved to bookmarks-${tableName}.json`
      );
    } else {
      console.info(
        chalk.yellow('[INFO]'),
        `no data saved to bookmarks-${tableName}.json`
      );
    }
  } catch (error) {
    throw `${chalk.red('[ERROR]')} ${chalk.blue(
      '(saveData)'
    )} (${tableName}) ${error}`;
  }
};

(async () => {
  try {
    const dataList = Object.keys(data).map(table => saveData(table));

    await Promise.all(dataList);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
