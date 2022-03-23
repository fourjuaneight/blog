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
  BKValues,
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
const getBookmarksWithOffset = async (
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

(async () => {
  try {
    const dataList = Object.keys(data).map(table =>
      getBookmarksWithOffset(table)
    );

    await Promise.all(dataList);

    const cleanData = Object.keys(data)
      .filter(key => data[key].length > 0)
      .reduce(
        (acc: { [key: string]: BKValues[] }, key) => ({
          ...acc,
          [key]: data[key],
        }),
        {}
      );

    await writeFile(
      `${dist}/bookmarks.json`,
      JSON.stringify(cleanData, null, 2)
    );

    console.info(chalk.green('[SUCCESS]'), 'data saved to bookmarks.json');

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
