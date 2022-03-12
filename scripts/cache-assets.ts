import { resolve } from 'path';

import chalk from 'chalk';
import glob from 'glob';
import { replaceInFile, ReplaceInFileConfig } from 'replace-in-file';

const globSync = glob.sync;

const SITE_URL: string = 'https://cleverlaziness.com';
const timestamp: number = Math.floor(new Date().getTime() / 1000);

// Glob options. Pass directory to search and files to ignore
const cwd = resolve(__dirname, '..', 'dist');
const ignore = ['sw.js'];

// Find all JS, CSS, and font files in rendered output
(async () => {
  console.info(
    chalk.cyan('[INFO]'),
    'Generating cache list for Service Worker.'
  );

  // create matched files array
  const files = globSync('**/*.{js,css,woff,woff2,png,webp,avif}', {
    cwd,
    ignore,
  });
  const sw = globSync('sw.min.*.js', { cwd });
  const ww = globSync('ww.min.*.js', { cwd });
  const noise = globSync('noise.min.*.js', { cwd });
  const newFiles = files.map(toCache => `'/${toCache}'`).toString();

  // find and replace options; add hash ID, files to cache array, and site base URL
  const replaceOptions: ReplaceInFileConfig = {
    files: [`${cwd}/${sw[0]}`, `${cwd}/${noise[0]}`],
    from: [/'staticAssets'/g, /'version'/g, /baseURL/g, '/ww.js'],
    to: [`[${newFiles}]`, `'${timestamp}'`, `${SITE_URL}`, `/${ww}`],
  };

  try {
    await replaceInFile(replaceOptions);

    console.info(chalk.green('[SUCCESS]'), 'Service Worker updated.');
  } catch (error) {
    throw new Error(`${chalk.red('[ERROR]')} ${error}`);
  }
})();
