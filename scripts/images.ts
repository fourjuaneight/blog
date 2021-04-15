import { resolve } from 'path';

import * as yargs from 'yargs';
import chalk from 'chalk';
import sharp from 'sharp';

interface VOptions {
  name: string;
  resize: number | number[];
  ext?: string;
}

interface Variants {
  about: VOptions[];
  avatar: VOptions[];
  favicon: VOptions[];
  hero: VOptions[];
  logo: VOptions[];
}

type Assets = 'about' | 'avatar' | 'favicon' | 'hero' | 'logo' | 'post';

const asset: ReadonlyArray<Assets> = [
  'about',
  'avatar',
  'favicon',
  'hero',
  'logo',
  'post',
];
const argv = yargs.option('asset', {
  choices: asset,
  demandOption: true,
}).argv;
const dir = resolve(__dirname, '..', 'public');
const variants: Variants = {
  about: [
    { name: 'about', resize: 350 },
    { name: 'about', resize: 350, ext: 'webp' },
    { name: 'about', resize: 350, ext: 'avif' },
  ],
  avatar: [
    { name: 'avatar', resize: 600 },
    { name: 'avatar', resize: 600, ext: 'webp' },
    { name: 'avatar', resize: 600, ext: 'avif' },
  ],
  favicon: [
    { name: 'favicon', resize: [16, 16] },
    { name: 'favicon', resize: [32, 32] },
    { name: 'icon', resize: [120, 120] },
    { name: 'icon', resize: [180, 180] },
    { name: 'icon', resize: [152, 152] },
    { name: 'icon', resize: [167, 167] },
    { name: 'icon', resize: [256, 256] },
    { name: 'icon', resize: [512, 512] },
  ],
  hero: [
    { name: 'hero', resize: 500 },
    { name: 'hero', resize: 500, ext: 'webp' },
    { name: 'hero', resize: 500, ext: 'avif' },
  ],
  logo: [
    { name: 'logo', resize: 250 },
    { name: 'logo', resize: 250, ext: 'webp' },
    { name: 'logo', resize: 250, ext: 'avif' },
  ],
};

/**
 * Create various size and format variants of an image.
 * @function
 *
 * @param {VOptions[]} data Variants options
 * @param {string}     src  Image to format and convert
 * @param {string}     dest Where to save image
 */
const fmtImage = async (
  data: VOptions[],
  src: string,
  dest: string
): Promise<void> => {
  const input = resolve(__dirname, src);

  // map array to promises
  const promises = data.map(async img => {
    // image options
    const sizes = Array.isArray(img.resize)
      ? { height: img.resize[0], width: img.resize[1] }
      : { width: img.resize };
    const type: any = img.ext || 'png';
    const fileName: string = Array.isArray(img.resize)
      ? `${img.name}-${img.resize[0]}x${img.resize[1]}.${type}`
      : `${img.name}.${type}`;
    const output = `${dir}/${dest}/${fileName}`;
    const image = sharp(input);

    // create variants
    await image
      .resize(sizes)
      .toFormat(type)
      .toFile(output)
      .then(() => {
        console.info(chalk.green('[SUCCESS]'), `${fileName} created.`);
      })
      .catch(err => {
        console.error(chalk.red('[ERROR]'), {
          input,
          output,
          err,
        });
      });
  });

  // wait until all promises are resolved
  await Promise.all(promises);
};

switch (argv.asset) {
  case 'about':
    fmtImage(variants.about, 'about.png', 'img');
    break;
  case 'avatar':
    fmtImage(variants.avatar, 'avatar.png', 'img');
    break;
  case 'favicon':
    fmtImage(variants.favicon, 'favicon.png', 'icons');
    break;
  case 'hero':
    fmtImage(variants.hero, 'hero.png', 'img');
    break;
  case 'logo':
    fmtImage(variants.logo, 'logo.png', 'img');
    break;
  default:
    console.info(chalk.blue('[INFO]'), 'No images converted.');
    break;
}
