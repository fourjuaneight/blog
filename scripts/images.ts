import { existsSync } from 'fs';
import { resolve } from 'path';

import glob from 'glob';
import sharp from 'sharp';

import logger from './logger';

interface Icons {
  name: string;
  size: number;
}

interface FormatOptions {
  png: sharp.PngOptions;
  web: sharp.WebpOptions;
  avif: sharp.AvifOptions;
  [key: string]: sharp.PngOptions | sharp.WebpOptions | sharp.AvifOptions;
}

const globSync = glob.sync;
const dir = resolve(__dirname, 'img');
const dist = resolve(__dirname, '..', 'assets/icons');
const icons: Icons[] = [
  { name: 'favicon', size: 16 },
  { name: 'favicon', size: 32 },
  { name: 'icon', size: 120 },
  { name: 'icon', size: 152 },
  { name: 'icon', size: 167 },
  { name: 'icon', size: 180 },
  { name: 'icon', size: 256 },
  { name: 'icon', size: 512 },
];

/**
 * Create various size and format variants of icons.
 * @function
 * @async
 *
 * @param {string} name file name
 * @param {number} size resize to this size
 *
 * @returns {Promise}
 */
const fmtIcon = async (name: string, size: number): Promise<void> => {
  const input = resolve(dir, 'favicon.png');

  // image options
  const fileName: string = `${name}-${size}x${size}.png`;
  const output = `${dist}/${fileName}`;

  try {
    // create variants
    if (!existsSync(output)) {
      const image = sharp(input);

      await image
        .resize(size, size, {
          background: { r: 255, g: 255, b: 255, alpha: 0.0 },
          fit: 'contain',
        })
        .toFile(output)
        .then(() => {
          logger.info(`[images] [fmtIcon]: ${name}-${size}x${size} created`);
        });
    }
  } catch (err) {
    throw `${JSON.stringify(
      {
        method: 'fmtIcon',
        name,
        err,
      },
      undefined,
      2
    )}`;
  }
};

(async () => {
  try {
    const icons = icons.map(icon => fmtIcon(icon.name, icon.size));

    await Promise.all(icons);

    process.exit(0);
  } catch (error) {
    logger.error(`[images] ${error}`);
    process.exit(1);
  }
})();
