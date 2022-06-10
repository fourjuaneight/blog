import { resolve } from 'path';

import chalk from 'chalk';
import glob from 'glob';
import sharp from 'sharp';

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
const iconDist = resolve(__dirname, '..', 'assets/icons');
const imgDist = resolve(__dirname, '..', 'assets/img');
const variants = ['png', 'webp', 'avif'];
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
 * Create placeholder image.
 * @function
 * @async
 *
 * @param {string} src Image to format and convert
 *
 * @returns {Promise}
 */
const fmtPlaceholder = async (src: string): Promise<void> => {
  const input = resolve(dir, src);
  const name = src.replace(/([a-zA-Z_]+).png/g, '$1');
  // format options
  const fmtOps: FormatOptions = {
    png: {
      progressive: true,
      quality: 20,
      compressionLevel: 9,
    },
    web: {
      effort: 6,
      quality: 20,
    },
    avif: {
      effort: 6,
      quality: 20,
    },
  };
  // image options
  const image = sharp(input);
  const resizeOps: sharp.ResizeOptions = {
    background: { r: 255, g: 255, b: 255, alpha: 0.0 },
    fit: 'contain',
  };

  try {
    // create variants
    const buff = await image.resize(64, undefined, resizeOps).blur().toBuffer();
    const promises = variants.map(async ext => {
      await sharp(buff)
        .resize(1024, undefined, resizeOps)

        .toFormat(ext as any, fmtOps[ext])
        .toFile(`${imgDist}/${name}-placeholder.${ext}`);
    });

    await Promise.all(promises);

    console.info(chalk.green('[IMAGES]'), `${name} placeholder created`);
  } catch (err) {
    throw `${JSON.stringify(
      {
        method: 'fmtPlaceholder',
        name,
        err,
      },
      undefined,
      2
    )}`;
  }
};

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
    const output = `${imgDist}/${fileName}`;
    const image = sharp(input);

    // create variants
    await image
      .resize(1024, undefined, {
        background: { r: 255, g: 255, b: 255, alpha: 0.0 },
        fit: 'contain',
      })
      .toFormat(ext as any, { progressive: true })
      .toFile(output);
  });

  try {
    await Promise.all(promises);

    console.info(chalk.green('[IMAGES]'), `${name} asset created`);
  } catch (err) {
    throw `${JSON.stringify(
      {
        method: 'fmtImage',
        name,
        err,
      },
      undefined,
      2
    )}`;
  }
};

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
  const output = `${iconDist}/${fileName}`;
  const image = sharp(input);

  try {
    // create variants
    await image
      .resize(size, size, {
        background: { r: 255, g: 255, b: 255, alpha: 0.0 },
        fit: 'contain',
      })
      .toFile(output);

    console.info(chalk.green('[IMAGES]'), `${name}-${size}x${size} created`);
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
    const imgFiles = globSync('*.png', { cwd: dir });
    const iconOps = icons.map(icon => fmtIcon(icon.name, icon.size));
    const imgPHOps = imgFiles.map(file => fmtPlaceholder(file));
    const imgOps = imgFiles.map(file => fmtImage(file));
    const ops = [...iconOps, ...imgOps];

    await Promise.all(ops);

    process.exit(0);
  } catch (error) {
    console.error(chalk.red('[ERROR]'), error);
    process.exit(1);
  }
})();
