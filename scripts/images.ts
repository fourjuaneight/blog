import { resolve } from 'path';

import chalk from 'chalk';
import glob from 'glob';
import sharp from 'sharp';

const globSync = glob.sync;
const dir = resolve(__dirname, 'img');
const dist = resolve(__dirname, '..', 'assets/img');
const variants = ['png', 'webp', 'avif'];

/**
 * Create various size and format variants of an image.
 * @function
 * @async
 *
 * @param {string} src Image to format and convert
 *
 * @returns {Promise}
 */
const fmtImage = async (src: string): Promise<void> => {
  const input = resolve(dir, src);
  const name = src.replace(/([a-zA-Z_]+).png/g, '$1');

  // map array to promises
  const promises = variants.map(async ext => {
    // image options
    const fileName: string = `${name}.${ext}`;
    const output = `${dist}/${fileName}`;
    const image = sharp(input);

    // create variants
    await image
      .resize(1024, 1024)
      .toFormat(ext as any)
      .toFile(output)
      .then(() => {
        console.info(chalk.green('[SUCCESS]'), `${fileName} created.`);
      })
      .catch(err => {
        throw new Error(
          `${chalk.red('[ERROR]')} ${JSON.stringify(
            {
              input,
              output,
              err,
            },
            undefined,
            2
          )}`
        );
      });
  });

  await Promise.all(promises);
};

(async () => {
  const files = globSync('*.png', { cwd: dir });
  const ops = files.map(file => fmtImage(file));

  await Promise.all(ops);
})();
