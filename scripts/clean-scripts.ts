import { resolve } from 'path';

import chalk from 'chalk';
import dotenv from 'dotenv';
import glob from 'glob';
import { replaceInFile, ReplaceInFileConfig } from 'replace-in-file';

dotenv.config();

const globSync = glob.sync;
const { AIRTABLE_BOOKMARKS_ID, AIRTABLE_TOKEN } = process.env;
const SITE_URL: string = 'https://cleverlaziness.com';
const timestamp: number = Math.floor(new Date().getTime() / 1000);

// Glob options. Pass directory to search and files to ignore
const cwd = resolve(__dirname, '..', 'dist');
const jsDir = resolve(cwd, 'js');
const ignore = ['js/sw*.js', 'js/noise*.js', 'js/bookmarks*.js'];

// Find all JS, CSS, and font files in rendered output
(async () => {
  console.info(
    chalk.cyan('[INFO]'),
    'Generating cache list for Service Worker.'
  );

  // create matched files array
  const files = globSync('**/*.{js,css,woff,woff2}', {
    cwd,
    ignore,
  });
  const sw = globSync('sw.min.*.js', { cwd: jsDir });
  const bookmarks = globSync('bookmarks.min.*.js', { cwd: jsDir });
  const bookmarksWW = globSync('bookmarks.ww.min.*.js', { cwd: jsDir });
  const noise = globSync('noise.min.*.js', { cwd: jsDir });
  const noiseWW = globSync('noise.ww.min.*.js', { cwd: jsDir });
  const newFiles = files.map(toCache => `'/${toCache}'`).toString();

  // find and replace options; add hash ID, files to cache array, and site base URL
  const replaceOptions: ReplaceInFileConfig = {
    files: [
      `${jsDir}/${sw[0]}`,
      `${jsDir}/${bookmarksWW[0]}`,
      `${jsDir}/${noise[0]}`,
    ],
    from: [
      /\["staticAssets"\]/g,
      /"version"/g,
      /baseURL/g,
      '/bookmarks.ww.js',
      '/noise.ww.js',
      '<AIRTABLE_TOKEN>',
      '<AIRTABLE_BOOKMARKS_ID>',
    ],
    to: [
      `[${newFiles}]`,
      `'${timestamp}'`,
      `${SITE_URL}`,
      `/${bookmarksWW}`,
      `/${noiseWW}`,
      `${AIRTABLE_TOKEN}`,
      `${AIRTABLE_BOOKMARKS_ID}`,
    ],
  };
  console.info(replaceOptions);

  try {
    await replaceInFile(replaceOptions);

    console.info(chalk.green('[SUCCESS]'), 'Service Worker updated.');
  } catch (error) {
    throw new Error(`${chalk.red('[ERROR]')} ${error}`);
  }
})();
