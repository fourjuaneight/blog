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
const ignore = ['sw*.js', 'noise*.js', 'bookmarks*.js'];

// Find all JS, CSS, and font files in rendered output
(async () => {
  // create matched files array
  const files = globSync('**/*.{js,css,woff,woff2}', {
    cwd,
    ignore,
  });
  const sw = globSync('sw.min.*.js', { cwd });
  const bookmarks = globSync('bookmarks.min.*.js', { cwd });
  const bookmarksWW = globSync('bookmarks.ww.min.*.js', { cwd });
  const noise = globSync('noise.min.*.js', { cwd });
  const noiseWW = globSync('noise.ww.min.*.js', { cwd });
  const newFiles = files.map(toCache => `'/${toCache}'`).toString();

  // find and replace options; add hash ID, files to cache array, and site base URL
  const replaceOptions: ReplaceInFileConfig = {
    files: [`${cwd}/${sw[0]}`, `${cwd}/${bookmarks[0]}`, `${cwd}/${noise[0]}`],
    from: [
      /\["staticAssets"\]/g,
      /"version"/g,
      /baseURL/g,
      '/bookmarks.ww.min.js',
      '/noise.ww.min.js',
    ],
    to: [
      `[${newFiles}]`,
      `'${timestamp}'`,
      `${SITE_URL}`,
      `/${bookmarksWW}`,
      `/${noiseWW}`,
    ],
  };

  try {
    await replaceInFile(replaceOptions);

    console.info(chalk.cyan('[SCRIPTS]'), 'Worker scripts updated.');
  } catch (error) {
    throw new Error(`${chalk.red('[ERROR]')} ${error}`);
  }
})();
