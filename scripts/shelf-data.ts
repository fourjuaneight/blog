import { promises } from 'fs';
import { resolve } from 'path';

import chalk from 'chalk';
import dotenv from 'dotenv';
import fetch from 'isomorphic-fetch';

import {
  AirtableShelfResp,
  ShelfFields,
  ShelfItem,
  ShelfRecord,
} from './types';

dotenv.config();

const dist = resolve(__dirname, '..', 'data');
const { writeFile } = promises;
const { AIRTABLE_MEDIA_ID, AIRTABLE_TOKEN } = process.env;
let data: ShelfRecord[] = [];

/**
 * Get shelf list from Airtable.
 * Request can be recursive is there is more than 100 records.
 * @function
 * @async
 *
 * @param  {[string]} offset param to request remainding records
 * @return {AirtableShelfResp}
 */
const getShelfWithOffset = (offset?: string): Promise<AirtableShelfResp> => {
  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };
  const endpoint = `https://api.airtable.com/v0/${AIRTABLE_MEDIA_ID}/Shelf`;
  const url = offset ? `${endpoint}?offset=${offset}` : endpoint;

  try {
    return fetch(url, options)
      .then((response: Response) => response.json())
      .then((airtableRes: AirtableShelfResp) => {
        data = [...data, ...airtableRes.records];

        if (airtableRes.offset) {
          return getShelfWithOffset(airtableRes.offset);
        }
        return airtableRes;
      });
  } catch (error) {
    throw `${chalk.red('[ERROR]')} ${chalk.blue(
      '(getShelfWithOffset)'
    )} - ${error}`;
  }
};

/**
 * Save Airtable data to local JSON data file.
 * @function
 * @async
 *
 * @return {void}
 */
const saveData = async (): Promise<void> => {
  try {
    await getShelfWithOffset();

    if (data.length) {
      const cleanData: ShelfItem[] = data
        .map((item: ShelfRecord) => ({
          ...item.fields,
          cover: item.fields.cover[0].url,
          completed: item.fields.completed || false,
        }))
        .sort((a: ShelfItem, b: ShelfItem) => a.name.localeCompare(b.name));
      const groupedData: { [key: string]: ShelfItem[] } = cleanData.reduce(
        (acc: { [key: string]: ShelfItem[] }, item: ShelfItem) => {
          const key = item.category;

          if (!acc[key]) {
            acc[key] = [];
          }

          acc[key].push(item);

          return acc;
        },
        {}
      );

      await writeFile(
        `${dist}/shelf.json`,
        JSON.stringify(groupedData, null, 2)
      );

      console.info(
        chalk.green('[SUCCESS]'),
        `${chalk.blue('(saveData)')} - Data saved to shelf.json`
      );
    } else {
      console.info(
        chalk.yellow('[INFO]'),
        `${chalk.blue('(saveData)')} - No data to save`
      );
    }
  } catch (error) {
    throw `${chalk.red('[ERROR]')} ${chalk.blue('(saveData)')} ${error}`;
  }
};

(async () => {
  try {
    await saveData();

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
