import { promises } from 'fs';
import { resolve } from 'path';

import chalk from 'chalk';
import dotenv from 'dotenv';
import fetch from 'isomorphic-fetch';

import { AirtableResp, ShelfFields, ShelfItem, ShelfRecord } from '.types';

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
 * @return {AirtableResp}
 */
const getShelfWithOffset = (offset?: string): Promise<AirtableResp> => {
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
      .then((airtableRes: AirtableResp) => {
        data = [...data, ...airtableRes.records];

        if (airtableRes.offset) {
          return getShelfWithOffset(airtableRes.offset);
        }
        return airtableRes;
      });
  } catch (error) {
    throw new Error(`(getShelfWithOffset): \n ${error}`);
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
        '(shelf-data) - Data saved to shelf.json'
      );
    } else {
      console.info(chalk.yellow('[INFO]'), '(shelf-data) - No data to save');
    }
  } catch (error) {
    console.error(chalk.red('[ERROR]'), '(shelf-data) - ', error);
    process.exit(1);
  }
};

saveData();
