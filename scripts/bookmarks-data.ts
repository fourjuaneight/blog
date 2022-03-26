import { promises } from 'fs';
import { resolve } from 'path';

import chalk from 'chalk';
import fetch from 'isomorphic-fetch';

import {
  BookmarksData,
  BKFields,
  BKRecord,
  BKValues,
  RedditFields,
  TweetFields,
  WebFields,
} from './types';

const dist = resolve(__dirname, '..', 'data');
const { writeFile } = promises;
// table data
const data: BookmarksData = {
  Articles: [],
  Comics: [],
  Podcasts: [],
  Reddits: [],
  Tweets: [],
  Videos: [],
};

const getBookmarks = async (table: string): Promise<void> => {
  try {
    const response = await fetch(
      `https://cleverlaziness.com/api/bookmarks/${table}`
    );
    const bookmarks: BKValues[] = await response.json();
    const sortedBookmarks = bookmarks
      .sort((a, b) => {
        if (table === 'Tweets') {
          const aTweet = a as TweetFields;
          const bTweet = b as TweetFields;

          return aTweet.tweet.toLowerCase() > bTweet.tweet.toLowerCase()
            ? 1
            : -1;
        } else {
          const aWeb = a as WebFields;
          const bWeb = b as WebFields;

          return aWeb.title.toLowerCase() > bWeb.title.toLowerCase() ? 1 : -1;
        }
      })
      .sort((a, b) => {
        if (table === 'Reddits') {
          const aReddit = a as RedditFields;
          const bReddit = b as RedditFields;

          return aReddit.subreddit.toLowerCase() >
            bReddit.subreddit.toLowerCase()
            ? 1
            : -1;
        } else {
          const aWeb = a as WebFields;
          const bWeb = b as WebFields;

          return aWeb.creator.toLowerCase() > bWeb.creator.toLowerCase()
            ? 1
            : -1;
        }
      });

    data[table] = sortedBookmarks;
  } catch (error) {
    throw `${chalk.red('[ERROR]')} ${chalk.blue(
      '(getBookmarks)'
    )} (${table.toLowerCase()}) ${error}`;
  }
};

(async () => {
  try {
    const dataList = Object.keys(data).map(table => getBookmarks(table));

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
