import { promises } from 'fs';
import { resolve } from 'path';

import chalk from 'chalk';
import fetch from 'isomorphic-fetch';

import { ShelfItem } from './types';

interface ShelfData {
  [key: string]: ShelfItem[];
}

const dist = resolve(__dirname, '..', 'data');
const { writeFile } = promises;
let data: ShelfData = {};

const getShelf = async (): Promise<void> => {
  try {
    const response = await fetch('https://cleverlaziness.com/api/shelf/');
    const shelf: ShelfData = await response.json();

    data = shelf;
  } catch (error) {
    throw `${chalk.red('[ERROR]')} ${chalk.blue('(getShelf)')} ${error}`;
  }
};

const saveData = async (): Promise<void> => {
  try {
    await getShelf();

    const isDataEmpty = Object.keys(data).length === 0;

    if (!isDataEmpty) {
      await writeFile(`${dist}/shelf.json`, JSON.stringify(data, null, 2));

      console.info(chalk.green('[SUCCESS]'), 'data saved to shelf.json');
    } else {
      console.info(chalk.yellow('[INFO]'), 'no data saved to shelf.json');
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
