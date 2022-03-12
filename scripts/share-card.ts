import { promises } from 'fs';
import { resolve } from 'path';

import chalk from 'chalk';
import glob from 'glob';
import sharp from 'sharp';
import { replaceInFile, ReplaceInFileConfig } from 'replace-in-file';

interface TitlePosition {
  count: number;
  position: string[];
}

const globSync = glob.sync;
const { readFile, rm, writeFile } = promises;

// glob options
const src = resolve(__dirname, 'img');
const posts = resolve(__dirname, '..', 'content/posts');
const dist = resolve(__dirname, '..', 'assets/share-cards');
const ignore = ['_index.md'];
// posts
const files = globSync('*.md', { cwd: posts, ignore });
// title positions
const titlePositions: TitlePosition[] = [
  { count: 1, position: ['second'] },
  { count: 2, position: ['second', 'third'] },
  { count: 3, position: ['first', 'second', 'third'] },
  { count: 4, position: ['first', 'second', 'third', 'fourth'] },
];
const textElements = ['first', 'second', 'third', 'fourth'];

/**
 * Create share card and update with post title
 * @function
 * @async
 *
 * @param file name of post file
 * @returns {Promise<void>}
 */
const createShareCard = async (file: string): Promise<void> => {
  try {
    // post title
    const post = await readFile(`${posts}/${file}`, 'utf8');
    const pattern = new RegExp(/\ntitle:\s'?(.*)'?/g);
    const title =
      post
        .match(pattern)
        ?.toString()
        .replace(pattern, '$1')
        .replace(/'/g, '')
        .replace(/\s$/g, '') ?? '';
    const titleList = title.split(' ');
    // share card image
    const shareCard = `${src}/share_card.svg`;
    const fileName = file.replace('.md', '');
    const svg = await readFile(shareCard, 'utf8');
    const positions = titlePositions.find(
      ({ count }) => count === titleList?.length
    );
    const shareCardPath = `${dist}/${fileName}.svg`;
    // create share card file
    await writeFile(shareCardPath, svg);
    // replace title positions
    const replacePositions = textElements.filter(element =>
      positions?.position.includes(element)
    );
    const mainPats = replacePositions.map(
      element =>
        new RegExp(`<text id="main-${element}"(.*)display:none;">(.*)</text>`)
    );
    const mainTitles = replacePositions.map(
      (element, index) =>
        `<text id="main-${element}"$1">${titleList[index]}</text>`
    );
    const shadowPats = replacePositions.map(
      element =>
        new RegExp(`<text id="shadow-${element}"(.*)display:none;">(.*)</text>`)
    );
    const shadowTitles = replacePositions.map(
      (element, index) =>
        `<text id="shadow-${element}"$1">${titleList[index]}</text>`
    );
    // replace in file
    const replaceOptions: ReplaceInFileConfig = {
      files: shareCardPath,
      from: [...mainPats, ...shadowPats],
      to: [...mainTitles, ...shadowTitles],
    };

    await replaceInFile(replaceOptions);
    // create img and remove svg
    const image = sharp(shareCardPath);

    await image.toFormat('png').toFile(`${dist}/${fileName}.png`);
    await rm(shareCardPath);

    console.info(
      chalk.green('[SUCCESS]'),
      `${fileName}.png share-card created`
    );
  } catch (error) {
    throw `${chalk.red('[ERROR]')} ${chalk.blue('(createShareCard)')} ${error}`;
  }
};

(async () => {
  try {
    const ops = files.map(file => createShareCard(file));

    await Promise.all(ops);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
