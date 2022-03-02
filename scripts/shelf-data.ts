import { promises } from 'fs';
import { resolve } from 'path';

import chalk from 'chalk';
import dotenv from 'dotenv';
import fetch from 'isomorphic-fetch';

dotenv.config();

const dist = resolve(__dirname, '..', 'data');
const { writeFile } = promises;
const { AIRTABLE_MEDIA_ID, AIRTABLE_TOKEN } = process.env;
let data: Record[] = [];

interface Fields {
  Name: string;
  Creator: string;
  Rating: number;
  Cover: {
    id: string;
    width: number;
    height: number;
    url: string;
    filename: string;
    size: number;
    type: string;
    thumbnails: {
      small: {
        url: string;
        width: number;
        height: number;
      };
      large: {
        url: string;
        width: number;
        height: number;
      };
      full: {
        url: string;
        width: number;
        height: number;
      };
    };
  }[];
  Category: string;
  Genre: string;
  Completed: boolean;
  Comments: string;
}

interface Record {
  id: string;
  fields: Fields;
  createdTime: string;
}

interface AirtableResp {
  records: Record[];
  offset: string;
}

interface Item {
  Name: string;
  Creator: string;
  Rating: number;
  Cover: string;
  Category: string;
  Genre: string;
  Completed: boolean;
  Comments: string;
}

/**
 * Get bookmarks list from Airtable.
 * Request can be recursive is there is more than 100 records.
 * @function
 * @async
 *
 * @param {[string]} offset param to request remainding records
 * @return {AirtableResp}
 */
const getBookmarksWithOffset = (offset?: string): Promise<AirtableResp> => {
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
          return getBookmarksWithOffset(airtableRes.offset);
        }
        return airtableRes;
      });
  } catch (error) {
    throw new Error(`(getBookmarksWithOffset): \n ${error}`);
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
    await getBookmarksWithOffset();

    if (data.length) {
      const cleanData: Item[] = data.map((item: Record) => ({
        ...item.fields,
        Cover: item.fields.Cover[0].url,
      }));
      const groupedData: { [key: string]: Item[] } = cleanData.reduce(
        (acc: { [key: string]: Item[] }, item: Item) => {
          const key = item.Category;

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

      console.info(chalk.green('[SUCCESS]'), 'Data saved to shelf.json');
    } else {
      console.info(chalk.yellow('[INFO]'), 'No data to save');
    }
  } catch (error) {
    console.error(chalk.red('[ERROR]'), error);
    process.exit(1);
  }
};

saveData();
